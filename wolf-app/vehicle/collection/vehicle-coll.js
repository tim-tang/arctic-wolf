 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var vehicleModel = require('../model/vehicle-model');

     vehicleColl = Backbone.Collection.extend({

         model: vehicleModel,
         url: '/vehicles',

         // filter out selected vehicle recrods.
         selected: function() {
             return this.filter(function(vehicle) {
                 return vehicle.get('is_selected') === true;
             });
         }
     });
     module.exports = new vehicleColl();
 });
