 define(function(require, exports, module) {

     var Backbone = require('backbone');

     var privilegeAttrsModel = Backbone.Model.extend({
     
     	urlRoot: App.WS_HOST + '/privilege-attrs'


     });

     module.exports = privilegeAttrsModel;
 });
