define("wolf-app/dashboard/0.0.1/index-debug", [ "./dashboard-app-debug", "backbone-debug", "app-core-debug", "./router/dashboard-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.DashboardApp = require("./dashboard-app-debug");
});

define("wolf-app/dashboard/0.0.1/dashboard-app-debug", [ "backbone-debug", "app-core-debug", "wolf-app/dashboard/0.0.1/router/dashboard-router-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var appCore = require("app-core-debug");
    var viewManager = appCore.viewMgmt;
    var eventBus = appCore.Eventbus;
    var dashboardApp = new Backbone.Layout({
        manage: true,
        prefix: "dashboard/src/tpl/",
        template: "dashboard.html",
        initialize: function() {},
        afterRender: function() {}
    });
    module.exports = {
        run: function(viewManager) {
            viewManager.show("#main-content", dashboardApp);
        },
        invokeDashboardRouter: function() {
            var dashboardRouter = require("wolf-app/dashboard/0.0.1/router/dashboard-router-debug");
            return new dashboardRouter("dashboard/", {
                createTrailingSlashRoutes: true
            });
        }
    };
});

define("wolf-app/dashboard/0.0.1/router/dashboard-router-debug", [ "backbone-debug", "app-core-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    require("subroute-debug");
    var dashboardRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            "": "home"
        },
        home: function() {
            eventBus.trigger("layout:switch-module-action");
        }
    });
    module.exports = dashboardRouter;
});
