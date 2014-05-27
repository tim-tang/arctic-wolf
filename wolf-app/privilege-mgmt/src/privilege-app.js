define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var eventBus = require('app-core').Eventbus;

	var appCommon = require('app-common');
	var commonLoading = appCommon.CommonLoading;
	var genericViewFactory = appCommon.GenericViewFactory;

	var privilegeColl = require('./collection/privilege-coll');
	var privilegeModal = require('./view/modal/privilege-new-modal');

	var privilegeApp = new Backbone.Layout({
		
		manage : true,

		prefix : "privilege-mgmt/src/tpl/",

		template : 'privilege-container.html',

		events : {
			//TODO:
		},
		
		initialize : function() {
			eventBus.on('show-loading', this.show_loading, this);
			eventBus.on('hide-loading', this.hide_loading, this);
		},

		afterRender : function() {
			var privilegeMgmtView = genericViewFactory.createView('OBJ_MGMT', {
				'collection' : privilegeColl,
				'view_url' : 'privilege-mgmt/view'
			});
			this.insertView('#privilege-home', privilegeMgmtView).render();

			var privilegeModalView = new privilegeModal();
			this.insertView('#privilege-home', privilegeModalView).render();
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
			viewManager.show('#main-content', privilegeApp);
		},

		invokePrivilegeRouter : function() {
			var privilegeRouter = require('./router/privilege-router');
			return new privilegeRouter('privilege-mgmt/', {
				createTrailingSlashRoutes : true
			});
		}
	};
});
