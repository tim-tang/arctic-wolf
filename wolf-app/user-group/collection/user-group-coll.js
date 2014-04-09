 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var userGroupModel = require('../model/user-group-model');

     userGroupColl = Backbone.Collection.extend({

         model: userGroupModel,
         url: '/user-groups',

         // Fetch User Group
         getUserGroup: function() {

         }
     });

     module.exports = new userGroupColl();
 });
