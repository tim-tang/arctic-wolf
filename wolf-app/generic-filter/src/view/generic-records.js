define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var eventBus = require('app-core').Eventbus;

    var genericRecords = Backbone.View.extend({

        manage: true,
        prefix: "generic-filter/src/tpl/",
        template: 'generic-records.html',

        initialize: function(options) {
            this.records = options.records;
        },

        afterRender: function() {
            //TODO:
        },

        serialize: function() {
            return {
                records: _.chain(this.records)
            };
        },
    });

    module.exports = genericRecords;
});
