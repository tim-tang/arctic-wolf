 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var criteriaAttrsModel = Backbone.Model.extend({

     	urlRoot: '/criteria-attrs'


     });

     module.exports = criteriaAttrsModel;
 });
