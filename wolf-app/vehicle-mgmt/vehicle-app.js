 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var eventBus = require('../app-core/app-core-index').Eventbus;
     var appCommon = require('../app-common/app-common-index');
	 var commonLoading = appCommon.CommonLoading;
     var vehicleMgmt = require('./view/vehicle-mgmt');
     var vehicleModal = require('./view/vehicle-new-modal');

     var vehicleApp = new Backbone.Layout({

         manage: true,
         prefix: "vehicle-mgmt/templates/",
         template: 'vehicle-container.html',

         initialize: function() {
             eventBus.on('show-loading', this.show_loading, this);
             eventBus.on('hide-loading', this.hide_loading, this);
         },

         events: {
             //TODO:
         },

         afterRender: function() {
             var vehicleMgmtView = new vehicleMgmt();
             this.insertView('#vehicle-home', vehicleMgmtView).render();
             var vehicleModalView = new vehicleModal();
             this.insertView('#vehicle-home', vehicleModalView).render();
         },

         show_loading: function() {
             commonLoading.init('#main-content');
         },

         hide_loading: function() {
             commonLoading.destroy();
         }
     });

     module.exports = {
         run: function(viewManager) {
            viewManager.show('#main-content', vehicleApp);
         },

         invokeVehicleRouter: function() {
            var vehicleRouter = require('./router/vehicle-router');
            return new vehicleRouter('vehicle-mgmt/', {
                createTrailingSlashRoutes: true
            });
         }
     };
 });
