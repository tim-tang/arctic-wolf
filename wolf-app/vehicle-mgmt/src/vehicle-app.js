define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var eventBus = require('app-core').Eventbus;

	var appCommon = require('app-common');
	var commonLoading = appCommon.CommonLoading;
	var genericViewFactory = appCommon.GenericViewFactory;

    var vehicleColl = require('./collection/vehicle-coll');
    var vehicleModal = require('./view/modal/vehicle-new-modal');

	var vehicleApp = new Backbone.Layout({

		manage : true,
		prefix : "vehicle-mgmt/src/tpl/",
		template : 'vehicle-container.html',

		initialize : function() {
			eventBus.on('show-loading', this.show_loading, this);
			eventBus.on('hide-loading', this.hide_loading, this);
		},

		events : {
			//TODO:
		},

		afterRender : function() {
            var vehicleMgmtView = genericViewFactory.createView('OBJ_MGMT', {
                'collection': vehicleColl,
                'view_url': 'vehicle-mgmt/view'
            });
			this.insertView('#vehicle-home', vehicleMgmtView).render();
			var vehicleModalView = new vehicleModal();
			this.insertView('#vehicle-home', vehicleModalView).render();
            this.$el.i18n();
		},

		show_loading : function() {
			commonLoading.init('#main-content');
		},

		hide_loading : function() {
			commonLoading.destroy();
		}
	});

	module.exports = {
		run : function(viewManager) {
			viewManager.show('#main-content', vehicleApp);
		},

		invokeVehicleRouter : function() {
			var vehicleRouter = require('./router/vehicle-router');
			return new vehicleRouter('vehicle-mgmt/', {
				createTrailingSlashRoutes : true
			});
		}
	};
});
