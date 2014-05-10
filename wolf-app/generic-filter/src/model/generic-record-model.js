 define(function(require, exports, module) {
     var Backbone = require('backbone');

     var genericRecordModel = Backbone.Model.extend({

         url: '/generic-records',

         defaults: {
             name: '',
             image: '',
             price: '',
             desc: ''
         }
     });

     module.exports = genericRecordModel;
 });
