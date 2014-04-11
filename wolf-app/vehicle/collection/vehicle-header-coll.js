 define(function(require, exports, module){

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var vehicleHeaderModel = require('../model/vehicle-model');

     vehicleHeaderColl = Backbone.Collection.extend({

         model: vehicleHeaderModel,
         url: 'http://localhost:5000/vehicle-headers'

         //TODO:
     });

      module.exports = new vehicleHeaderColl();
 });
