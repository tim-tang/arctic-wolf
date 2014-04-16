 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var criteriaAttrsModel = Backbone.Model.extend({
     
     	urlRoot: App.WS_HOST + '/criteria-attrs'


     });

     module.exports = criteriaAttrsModel;
 });
