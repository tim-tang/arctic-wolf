define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var eventBus = require('app-core').Eventbus;

	var appCommon = require('app-common');
	var commonLoading = appCommon.CommonLoading;
	var genericViewFactory = appCommon.GenericViewFactory;

	var userColl = require('./collection/user-coll');
	var userModal = require('./view/user-new-modal');

	var userApp = new Backbone.Layout({

		manage : true,

		prefix : "user-mgmt/src/tpl/",

		template : 'user-container.html',

		initialize : function() {
			eventBus.on('show-loading', this.show_loading, this);
			eventBus.on('hide-loading', this.hide_loading, this);
		},

		afterRender : function() {
			var userMgmtView = genericViewFactory.createView('OBJ_MGMT', {
				'collection' : userColl,
				'view_url' : 'user-mgmt/view'
			});
			this.insertView('#user-home', userMgmtView).render();

			var userModalView = new userModal();
			this.insertView('#user-home', userModalView).render();
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
			viewManager.show('#main-content', userApp);
		},

		invokeUserRouter : function() {
			var userRouter = require('./router/user-router');
			return new userRouter('user-mgmt/', {
				createTrailingSlashRoutes : true
			});
		}
	};
});
