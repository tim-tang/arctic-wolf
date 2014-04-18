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
        template: 'generic-filter-records.html',

        initialize: function(options){
            this.selector = options.el;
            this.listenTo(genericRecrodColl, 'request',this.show_loading);
            this.listenTo(genericRecrodColl, 'sync', this.hide_loading);
        },

        afterRender: function(){
            genericRecrodColl.fetch();
        },

        show_loading: function(){
            eventBus.trigger('show-loading', this.selector);
        },

        hide_loading: function(){
            //$('#generic-filter-records').html('xxxx');
            //genericRecord = new genericRecord({ records: genericRecrodColl.records});
            //self = this;
            //genericRecord.render().promise().done(function(){
            //    self.insertView('#generic-filter-records', genericRecord);
            //});
           //this.insertView(new genericRecord({el: '#generic-filter-records', records: genericRecrodColl.records})).render();
            //(new genericRecord({el: '#generic-filter-records', records: genericRecrodColl.records})).render();
            eventBus.trigger('hide-loading');
        },

    });

    module.exports = genericFilterRecords;
});
