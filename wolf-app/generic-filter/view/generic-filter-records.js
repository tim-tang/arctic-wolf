define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');
    var genericRecrodColl = require('../collection/generic-record-coll');

    var genericFilterRecords = Backbone.View.extend({

        manage: true,
        prefix: 'generic-filter/tpl/',
        template: 'generic-filter-records.html',

        initialize: function(options){
            this.selector = options.el;
            this.listenTo(genericRecrodColl, 'request',this.show_loading);
            this.listenTo(genericRecrodColl, 'sync', this.hide_loading);
        },

        show_loading: function(){
            eventBus.trigger('show-loading', this.selector);
        },

        hide_loading: function(){
            eventBus.trigger('hide-loading');
        },

    });

    module.exports = genericFilterRecords;
});
