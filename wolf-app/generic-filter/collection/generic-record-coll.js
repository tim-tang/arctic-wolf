define(function(require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');

    var genericRecordColl = Backbone.Collection.extend({

        url: App.WS_HOST + '/filter-generic-records',

        parse: function(resp){
            console.log(resp);
        }
    });

    module.exports = new genericRecordColl();
});
