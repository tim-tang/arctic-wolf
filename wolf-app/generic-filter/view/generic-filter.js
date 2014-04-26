define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');

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
            eventBus.trigger('show-loading', this.selector);
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },

        afterRender: function() {
            genericFilterColl.fetch();
        },

        filter_records: function(e) {
            eventBus.trigger('generic-filter:start');
            e.preventDefault();
            genericRecordColl.constructor.search('mock-params').done(function(resp) {
                eventBus.trigger('generic-filter:complete', resp.records);
            });
        }
    });

    module.exports = genericFilter;
});
