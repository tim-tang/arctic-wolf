 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var userAttrsModel = Backbone.Model.extend({
     
     	urlRoot: App.WS_HOST + '/user-attrs'


     });

     module.exports = userAttrsModel;
 });
