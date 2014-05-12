define(function(require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');
    //var FilterableColl = require('../../common/collection/filterable-coll');
    var genericRecord = require('../model/generic-record-model');

    var genericRecordColl = Backbone.Collection.extend({

        url: '/generic-records/filter',

        model: genericRecord,

        //parse: function(resp){
        //    var records = resp.filter_records;
        //    _.each(records, function(record){
        //    });
        //}
    });

    module.exports = new genericRecordColl();
});
