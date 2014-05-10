define(function(require, exports, module) {


    var Backbone = require('backbone');
    var appCommon = require('../app-common/app-common-index');
	var commonLoading = appCommon.CommonLoading;

    var eventBus = require('../app-core/app-core-index').Eventbus;
    var genericFilter = require('./view/generic-filter');
    var genericFilterRecords = require('./view/generic-record-container');
    var _ = require('underscore');

    var genericFilterApp = new Backbone.Layout({

        manage: true,
        prefix: "generic-filter/tpl/",
        template: 'generic-filter-container.html',

        initialize: function() {
            eventBus.on('generic-filter:show-loading', this.show_loading, this);
            eventBus.on('generic-filter:hide-loading', this.hide_loading, this);
        },


        afterRender: function() {
            // append generic filter view.
            var genericFilterView = new genericFilter({
                el: '#generic-filter-home'
            });
            this.insertView(genericFilterView).render();

            // append generic filter records view.
            var genericFilterRecordsView = new genericFilterRecords({
                el: '#generic-records-home'
            });
            this.insertView(genericFilterRecordsView).render();
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
            viewManager.show('#main-content', genericFilterApp);
        },

        invokeGenericFilterRouter: function(){
            var genericFilterRouter = require('./router/generic-filter-router');
            return new genericFilterRouter('generic-filter/', {
                createTrailingSlashRoutes: true
            });
        }
    };
});
