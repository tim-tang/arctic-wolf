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
            this.subviews = [];
            eventBus.on('show-loading', this.show_loading, this);
            eventBus.on('hide-loading', this.hide_loading, this);
        },


        afterRender: function() {
            var genericFilterView = new genericFilter({
                el: '#generic-filter-home'
            });
            this.insertView(genericFilterView).render();
            this.subviews.push(genericFilterView);
            var genericFilterRecordsView = new genericFilterRecords({
                el: '#generic-records-home'
            });
            this.insertView(genericFilterRecordsView).render();
            this.subviews.push(genericFilterRecordsView);
        },

        show_loading: function(selector) {
            commonLoading.init(selector);
        },

        hide_loading: function() {
            commonLoading.destroy();
        }
    });

    module.exports = {
        run: function(viewManager) {
            viewManager.show(genericFilterApp);
        }
    };
});
