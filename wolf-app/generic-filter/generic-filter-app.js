define(function(require, exports, module) {


    var Backbone = require('backbone');
    var commonLoading = require('../common/common-loading');
    var eventBus = require('../app-main/app-eventbus');
    var genericFilter = require('./view/generic-filter');
    var genericFilterRecords = require('./view/generic-record-container');

    var genericFilterApp = new Backbone.Layout({

        manage: true,
        keep: true,
        prefix: "generic-filter/tpl/",
        template: 'generic-filter-container.html',

        initialize: function() {
            eventBus.on('show-loading', this.show_loading, this);
            eventBus.on('hide-loading', this.hide_loading, this);
        },


        afterRender: function() {
            this.insertView(new genericFilter({el: '#generic-filter-home'})).render();
            this.insertView(new genericFilterRecords({el: '#generic-records-home'})).render();
        },

        show_loading: function(selector){
            commonLoading.init(selector);
        },

        hide_loading: function(){
            commonLoading.destroy();
        }
    });

    module.exports =  genericFilterApp;
});
