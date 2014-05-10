define(function(require, exports, module) {

    var Backbone = require('backbone');
    var appCore = require('../app-core/index');
    var viewManager = appCore.viewMgmt;
    var eventBus = appCore.Eventbus;

    var dashboardApp = new Backbone.Layout({

        manage: true,
        prefix: 'dashboard/templates/',
        template: 'dashboard.html',


        initialize: function() {
            //TODO:
        },


        afterRender: function() {
            //TODO:
        }
    });

    module.exports = {
        run: function(viewManager) {
            viewManager.show('#main-content', dashboardApp);
        },

        invokeDashboardRouter: function() {
            var dashboardRouter = require('./router/dashboard-router');
            return new dashboardRouter('dashboard/', {
                createTrailingSlashRoutes: true
            });
        }
    };
});
