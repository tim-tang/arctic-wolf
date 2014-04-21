 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var eventBus = require('../app-main/app-eventbus');
     var commonLoading = require('../common/common-loading');
     var vehicleMgmt = require('./view/vehicle-mgmt');
     var vehicleModal = require('./view/vehicle-new-modal');

     var vehicleApp = new Backbone.Layout({

         manage: true,
         keep: true,
         prefix: "vehicle-mgmt/templates/",
         template: 'vehicle-container.html',

         initialize: function() {
             this.subviews = [];
             eventBus.on('show-loading', this.show_loading, this);
             eventBus.on('hide-loading', this.hide_loading, this);
         },

         events: {
             //TODO:
         },

         afterRender: function() {
             var vehicleMgmtView = new vehicleMgmt();
             this.insertView('#vehicle-home', vehicleMgmtView).render();
             this.subviews.push(vehicleMgmtView);
             var vehicleModalView = new vehicleModal();
             this.insertView('#vehicle-home', vehicleModalView).render();
             this.subviews.push(vehicleModalView);
         },

         show_loading: function() {
             commonLoading.init('#main-content');
         },

         hide_loading: function() {
             commonLoading.destroy();
         },
     });

     module.exports = {
         run: function(viewManager) {
            viewManager.show(vehicleApp);
         }
     };
 });
