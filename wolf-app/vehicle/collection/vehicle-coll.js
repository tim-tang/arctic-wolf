 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var vehicleModel = require('../model/vehicle-model');

     var vehicleColl = Backbone.Collection.extend({

         model: vehicleModel,

         url: App.WS_HOST + '/vehicles',

         columns: [],

         parse: function(resp) {
             var values = _.pluck(resp, 'values');
             var attributes = _.pluck(resp, 'mData');
             var size = _.size(_.first(values));
             for(var i=0; i < size; i++){
                 var vehicle = new this.model();
                 _.each(attributes, function(attr, index){
                    vehicle.set(attr, values[index][i]);
                 });
                 //push the model object
                 this.push(vehicle);
             }

             // remove values key pair
             var self_columns = this.columns;
             _.map(resp, function(column){
                self_columns.push(_.omit(column, 'values'));
             });

             return this.models;
         },

         // filter out selected vehicle recrods.
         selected: function() {
             return this.filter(function(vehicle) {
                 return vehicle.get('is_selected') === true;
             });
         }
     });
     module.exports = new vehicleColl();
 });
