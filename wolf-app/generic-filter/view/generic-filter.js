define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var eventBus = require('../../app-core/app-core-index').Eventbus;
    var genericFilterColl = require('../collection/generic-filter-coll');
    var genericRecordColl = require('../collection/generic-record-coll');

    var genericFilter = Backbone.View.extend({
        manage: true,
        prefix: "generic-filter/tpl/",
        template: 'generic-filter.html',

        events: {
            'click #generic-filter-btn': 'filter_records'
        },

        initialize: function(options) {
            this.selector = options.el;
            this.listenTo(genericFilterColl, 'request', this.show_loading);
            this.listenTo(genericFilterColl, 'sync', this.hide_loading);
        },

        show_loading: function() {
            eventBus.trigger('generic-filter:show-loading', this.selector);
        },

        hide_loading: function() {
            eventBus.trigger('generic-filter:hide-loading');
        },

        afterRender: function() {
            genericFilterColl.fetch();
        },

        filter_records: function(e) {
            e.preventDefault();
            //TODO: collect params.
            genericRecordColl.fetch({
                data: $.param({
                    q: 'audi'
                })
            });
        }
    });

    module.exports = genericFilter;
});
