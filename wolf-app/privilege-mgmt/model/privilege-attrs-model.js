 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var privilegeAttrsModel = Backbone.Model.extend({

     	urlRoot: '/privilege-attrs'


     });

     module.exports = privilegeAttrsModel;
 });
