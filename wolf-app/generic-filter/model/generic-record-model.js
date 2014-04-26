 define(function(require, exports, module) {
     var Backbone = require('backbone');
     var BaseModel = require('../../common/model/base-model');

     var genericRecordModel = Backbone.Model.extend({

         url: App.WS_HOST + '/generic-records',

         defaults: {
             name: '',
             image: '',
             price: '',
             desc: ''
         }
     });

     module.exports = genericRecordModel;
 });
