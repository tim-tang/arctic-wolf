define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var eventBus = require('../../app-main/app-eventbus');

    var genericRecord = Backbone.View.extend({

        manage: true,
        prefix: "generic-filter/tpl/",
        tempalte: 'generic-record.html',

        initialize: function(options){
            this.records = options.records;
        },

        afterRender: function(){
            //TODO:
        },

        serialize: function() {
            return { records: _.clone(this.records)};
        },
    });

    module.exports = genericRecord;
});
