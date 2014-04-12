 define(function(require, exports, module) {

     var Backbone = require('backbone');
     baseCollection = Backbone.Collection.extend({
         urlRoot: 'http://localhost:5000'
     });

     module.exports = baseCollection;
 });
