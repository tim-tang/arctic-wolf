 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var userAttrsModel = require('../model/user-attrs-model');

     userAttrsColl = Backbone.Collection.extend({

         model: userAttrsModel,

         url: '/user-attrs',

         // Fetch crieriable attributes
         getCriteriableAttrs: function() {

         },

         // Fetch attributes which display in datatable header
         getDatatableHeaderAttrs: function() {

         }
     });

     module.exports = new userAttrsModel();
 });
