define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var eventBus = require('app-core').Eventbus;

	var appCommon = require('app-common');
	var commonLoading = appCommon.CommonLoading;
	var genericViewFactory = appCommon.GenericViewFactory;

	var roleColl = require('./collection/role-coll');
	var roleModal = require('./view/modal/role-new-modal');
	var roleDetailsApp = require('./role-details-app');

	var roleApp = new Backbone.Layout({

		manage : true,

		prefix : "role-mgmt/src/tpl/",

		template : 'role-container.html',

		events : {
			//TODO:
		},

		initialize : function() {
			eventBus.on('show-loading', this.show_loading, this);
			eventBus.on('hide-loading', this.hide_loading, this);
		},

		afterRender : function() {
			var roleMgmtView = genericViewFactory.createView('OBJ_MGMT', {
				'view_url' : 'role-mgmt/view',
				'collection' : roleColl
			});
			this.insertView('#role-home', roleMgmtView).render();

			var roleModalView = new roleModal();
			this.insertView('#role-home', roleModalView).render();
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
			viewManager.show('#main-content', roleApp);
		},

		invokeRoleRouter : function() {
			var roleRouter = require('./router/role-router');
			return new roleRouter('role-mgmt/', {
				createTrailingSlashRoutes : true
			});
		}
	};
});
