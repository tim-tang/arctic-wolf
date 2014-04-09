 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var userGroupAttrsModel = require('../model/user-group-attrs-model');

     userGroupAttrsColl = Backbone.Collection.extend({

         model: userGroupAttrsModel,
         url: '/user-group-attrs',

         // Fetch crieriable attributes
         getCriteriableAttrs: function() {

         },

         // Fetch attributes which display in datatable header
         getDatatableHeaderAttrs: function() {

         }
     });

     module.exports = new userGroupAttrsModel();
 });
