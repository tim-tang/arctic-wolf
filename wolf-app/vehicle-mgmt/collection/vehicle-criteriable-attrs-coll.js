 define(function(require, exports, module){

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var vehicleCriteriableAttrModel = require('../model/vehicle-model');

     vehicleCriteriableAttrColl = Backbone.Collection.extend({

         model: vehicleCriteriableAttrModel,
         url: '/vehicle-criteriable-attrs'

         //TODO:
     });

      module.exports = new vehicleCriteriableAttrColl();
 });
