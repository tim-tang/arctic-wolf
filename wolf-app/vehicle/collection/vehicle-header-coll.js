 define(function(require, exports, module){

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var vehicleHeaderModel = require('../model/vehicle-model');

     vehicleHeaderColl = Backbone.Collection.extend({

         model: vehicleHeaderModel,
         url: '/vehicle-headers'

         //TODO:
     });

      module.exports = new vehicleHeaderColl();
 });
