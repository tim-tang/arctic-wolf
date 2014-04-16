 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var roleAttrsModel = Backbone.Model.extend({
     
     	urlRoot: App.WS_HOST + '/role-attrs'


     });

     module.exports = roleAttrsModel;
 });
