define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;
    var genericRecordColl = require('../collection/generic-record-coll');
    var genericRecords = require('./generic-records');
    var genericRecordView;

    var genericFilterRecords = Backbone.View.extend({

        manage: true,
        prefix: 'generic-filter/tpl/',
        template: 'generic-record-container.html',

        initialize: function(options) {
            //_.bindAll(this, 'cleanup');
            this.selector = options.el;
            this.listenTo(genericRecordColl, 'request', this.show_loading);
            this.listenTo(genericRecordColl, 'sync', this.filter_complete);
        },

        afterRender: function() {
            genericRecordColl.fetch({
                data: $.param({
                    q: 'audi'
                })
            });
        },

        filter_complete: function() {
            // append generic record view.
            genericRecordView = new genericRecords({
                el: '#generic-filter-records',
                records: genericRecordColl.models
            });
            this.insertView(genericRecordView).render();
            // trigger hide loading.
            eventBus.trigger('generic-filter:hide-loading');
        },

        show_loading: function() {
            eventBus.trigger('generic-filter:show-loading', this.selector);
        },

        cleanup: function() {
            this.undelegateEvents();
            genericRecordView.remove();
        }
    });

    module.exports = genericFilterRecords;
});
