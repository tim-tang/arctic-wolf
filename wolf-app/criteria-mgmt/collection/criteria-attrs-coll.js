 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var criteriaAttrsModel = require('../model/criteria-attrs-model');

     criteriaAttrsColl = Backbone.Collection.extend({

         model: criteriaAttrsModel,

         url: App.WS_HOST + '/criteria-attrs',

         // Fetch crieriable attributes
         getCriteriableAttrs: function() {

         },

         // Fetch attributes which display in datatable header
         getDatatableHeaderAttrs: function() {

         }
     });

     module.exports = new criteriaAttrsModel();
 });
