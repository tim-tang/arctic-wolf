 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var privilegeAttrsModel = require('../model/privilege-attrs-model');

     privilegeAttrsColl = Backbone.Collection.extend({

         model: privilegeAttrsModel,

         url: '/privilege-attrs',

         // Fetch crieriable attributes
         getCriteriableAttrs: function() {

         },

         // Fetch attributes which display in datatable header
         getDatatableHeaderAttrs: function() {

         }
     });

     module.exports = new privilegeAttrsModel();
 });
