define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');
    var genericRecrodColl = require('../collection/generic-record-coll');
    var genericRecord = require('./generic-record');
    var genericRecordView;

    var genericFilterRecords = Backbone.View.extend({

        manage: true,
        prefix: 'generic-filter/tpl/',
        template: 'generic-record-container.html',

        initialize: function(options) {
            _.bindAll(this, 'cleanup');
            this.selector = options.el;
            eventBus.on('generic-filter:complete', this.filter_complete, this);
            eventBus.on('generic-filter:start', this.show_loading, this);
        },

        afterRender: function() {
            eventBus.trigger('generic-filter:start');
            genericRecrodColl.constructor.search('mock-params').done(function(resp) {
                eventBus.trigger('generic-filter:complete', resp.records);
            });
        },

        filter_complete: function(records) {
            // append generic record view.
            genericRecordView = new genericRecord({
                el: '#generic-filter-records',
                records: records
            });
            this.insertView(genericRecordView).render();
            // trigger hide loading.
            eventBus.trigger('hide-loading');
        },

        show_loading: function() {
            eventBus.trigger('show-loading', this.selector);
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading', this.selector);
        },

        cleanup: function(){
             genericRecrodColl.reset();
             genericRecordView.remove();
             eventBus.off('generic-filter:complete');
             eventBus.off('generic-filter:start');
        }
    });

    module.exports = genericFilterRecords;
});
