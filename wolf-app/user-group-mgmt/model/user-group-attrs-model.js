 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var userGroupAttrsModel = Backbone.Model.extend({

     	urlRoot: '/user-group-attrs'


     });

     module.exports = userGroupAttrsModel;
 });
