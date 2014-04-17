 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var vehicleMgmt = require('./view/vehicle-mgmt');
     var vehicleModal = require('./view/vehicle-new-modal');
     var eventBus = require('../app-main/app-eventbus');
     var commonLoading = require('../common/common-loading');
     var vehicleApp = new Backbone.Layout({

         //el: '#main-content',

         manage: true,
         keep: true,
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
             this.insertView('#vehicle-home', new vehicleMgmt()).render();
             this.insertView('#vehicle-home', new vehicleModal()).render();
         },

        show_loading: function(){
            commonLoading.init('#main-content');
        },

        hide_loading: function(){
            commonLoading.destroy();
        }
     });
     module.exports = vehicleApp;
 });
