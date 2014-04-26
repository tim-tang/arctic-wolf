define(function(require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');
    var FilterableColl = require('../../common/collection/filterable-coll');

    var genericRecordColl = FilterableColl.extend({

        url: App.WS_HOST + '/generic-records',

        parse: function(resp){
            this.records = resp.filter_records;
        }
    });

    module.exports = new genericRecordColl();
});
