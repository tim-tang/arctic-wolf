 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var vehicleMgmt = require('./view/vehicle-mgmt');
     var vehicleModal = require('./view/vehicle-new-modal');

     var vehicleApp = new Backbone.Layout({

        manage: true,

        keep: true,

        template: 'vehicle/templates/vehicle-container.html',

        events: {
            //TODO:
         },

        afterRender: function(){
            this.insertView('#vehicle-home', new vehicleMgmt()).render();
            this.insertView('#vehicle-home', new vehicleModal()).render();
        }
     });
     module.exports = vehicleApp;
 });
