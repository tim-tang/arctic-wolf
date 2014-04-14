 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var userGroupModel = require('../model/user-group-model');

     var userGroupColl = Backbone.Collection.extend({

         model: userGroupModel,

         url: App.WS_HOST + '/user-groups'
     });

     module.exports = new userGroupColl();
 });
