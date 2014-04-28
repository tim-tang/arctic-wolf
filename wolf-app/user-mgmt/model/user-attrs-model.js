 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var userAttrsModel = Backbone.Model.extend({

     	urlRoot: '/user-attrs'


     });

     module.exports = userAttrsModel;
 });
