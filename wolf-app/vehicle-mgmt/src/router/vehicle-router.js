define(function(require, exports, module) {

    var Backbone = require('backbone');
    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    require('subroute');

    var vehicleRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //this.layoutApp = options.layoutApp;
        },

        routes: {
            '': 'home',
            'view/:vehicleId': 'viewVehicle',
            'general-info': 'viewGeneralInfo',
            'history': 'viewHistory'
        },

        home: function() {
            eventBus.trigger('layout:switch-module-action');
        },

        viewVehicle: function(vehicleId) {
            require('../vehicle-details-app').run(viewManager, vehicleId);
        },

        viewGeneralInfo: function() {
            eventBus.trigger('vehicle:render-general-info');
        },

        viewHistory: function() {
            eventBus.trigger('vehicle:render-history');
        }
    });

    module.exports = vehicleRouter;
});
