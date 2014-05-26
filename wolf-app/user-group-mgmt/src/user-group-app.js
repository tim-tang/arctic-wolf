define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var eventBus = require('app-core').Eventbus;

	var appCommon = require('app-common');
	var commonLoading = appCommon.CommonLoading;
	var genericViewFactory = appCommon.GenericViewFactory;

	var userGroupColl = require('./collection/user-group-coll');
	var userGroupModal = require('./view/modal/user-group-new-modal');

	var userGroupApp = new Backbone.Layout({

		manage : true,

		prefix : "user-group-mgmt/src/tpl/",

		template : 'user-group-container.html',

		events : {
			//TODO:
		},

		initialize : function() {
			eventBus.on('show-loading', this.show_loading, this);
			eventBus.on('hide-loading', this.hide_loading, this);
		},

		afterRender : function() {
			var userGroupMgmtView = genericViewFactory.createView('OBJ_MGMT', {
				'collection' : userGroupColl,
				'view_url' : 'user-group-mgmt/view'
			});
			this.insertView('#user-group-home', userGroupMgmtView).render();
			var userGroupModalView = new userGroupModal();
			this.insertView('#user-group-home', userGroupModalView).render();
		},

		show_loading : function() {
			commonLoading.init('#main-content');
		},

		hide_loading : function() {
			commonLoading.destroy();
		},
	});

	module.exports = {
		run : function(viewManager) {
			viewManager.show('#main-content', userGroupApp);
		},
		
		invokeUserGroupRouter : function() {
			var userGroupRouter = require('./router/user-group-router');
			return new userGroupRouter('user-group-mgmt/', {
				createTrailingSlashRoutes : true
			});
		}
	};
});
