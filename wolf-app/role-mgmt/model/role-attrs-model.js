 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var roleAttrsModel = Backbone.Model.extend({

     	urlRoot: '/role-attrs'


     });

     module.exports = roleAttrsModel;
 });
