define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');
    var genericRecrodColl = require('../collection/generic-record-coll');
    var genericRecord = require('./generic-record');

    var genericFilterRecords = Backbone.View.extend({

        manage: true,
        prefix: 'generic-filter/tpl/',
        template: 'generic-record-container.html',

        initialize: function(options) {
            this.subviews = [];
            this.selector = options.el;
            this.listenTo(genericRecrodColl, 'request', this.show_loading);
            this.listenTo(genericRecrodColl, 'sync', this.filter_complete);
        },

        afterRender: function() {
            genericRecrodColl.fetch();
        },

        show_loading: function() {
            eventBus.trigger('show-loading', this.selector);
        },

        filter_complete: function() {
            var genericRecordView = new genericRecord({
                el: '#generic-filter-records',
                records: genericRecrodColl.records
            });
            this.insertView(genericRecordView).render();
            this.subviews.push(genericRecordView);
            eventBus.trigger('hide-loading');
        },
    });

    module.exports = genericFilterRecords;
});
