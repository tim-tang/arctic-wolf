define("wolf-app/app-main/0.0.1/index-debug", [ "./app-main-debug", "$-debug", "underscore-debug", "wolf-tpl-debug", "backbone-debug", "layoutmanager-debug", "app-security-debug", "./app-router-debug", "app-core-debug", "./app-base-router-debug", "app-dashboard-debug", "app-generic-filter-debug", "app-user-mgmt-debug", "app-user-group-mgmt-debug", "app-role-mgmt-debug", "app-privilege-mgmt-debug", "app-criteria-mgmt-debug", "app-vehicle-mgmt-debug", "app-layout-debug", "app-common-debug" ], function(require, exports, module) {
    module.exports.AppMain = require("./app-main-debug");
});

define("wolf-app/app-main/0.0.1/app-main-debug", [ "$-debug", "underscore-debug", "wolf-tpl-debug", "backbone-debug", "layoutmanager-debug", "app-security-debug", "wolf-app/app-main/0.0.1/app-router-debug", "app-core-debug", "wolf-app/app-main/0.0.1/app-base-router-debug", "app-dashboard-debug", "app-generic-filter-debug", "app-user-mgmt-debug", "app-user-group-mgmt-debug", "app-role-mgmt-debug", "app-privilege-mgmt-debug", "app-criteria-mgmt-debug", "app-vehicle-mgmt-debug", "app-layout-debug", "app-common-debug" ], function(require, exports, module) {
    //- Import dependency js
    var $ = require("$-debug");
    window._ = require("underscore-debug");
    require("wolf-tpl-debug");
    var Backbone = require("backbone-debug");
    require("layoutmanager-debug");
    var authenticationProvider = require("app-security-debug").AuthenticationProvider;
    var appRouter = require("wolf-app/app-main/0.0.1/app-router-debug");
    window.App = require("app-common-debug").CommonConstants;
    /****************************************************
     * Backbone Layout Manager Configuration.
     ****************************************************/
    Backbone.Layout.configure({
        // Set the prefix to where your templates live on the server, but keep in
        // mind that this prefix needs to match what your production paths will be.
        // Typically those are relative.  So we'll add the leading `/` in `fetch`.
        prefix: "wolf-app/",
        // This method will check for prebuilt templates first and fall back to
        // loading in via AJAX.
        fetchTemplate: function(path) {
            if (seajs.production) {
                // Check for a global JST object.  When you build your templates for
                // production, ensure they are all attached here.
                var JST = window.JST || {};
                // If the path exists in the object, use it instead of fetching remotely.
                if (JST[path]) {
                    return JST[path];
                }
            }
            // If it does not exist in the JST object, mark this function as
            // asynchronous.
            var done = this.async();
            // Fetch via jQuery's GET.  The third argument specifies the dataType.
            $.get(path, function(contents) {
                // Assuming you're using underscore templates, the compile step here is
                // `_.template`.
                done(_.template(contents));
            }, "text");
        }
    });
    /****************************************************
     * Override original backbone sync.
     ****************************************************/
    var backboneSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
        /*
         * Change the `url` property of options.
         */
        options = _.extend(options, {
            url: App.WS_HOST + (_.isFunction(model.url) ? model.url() : model.url)
        });
        /**
         * The jQuery `ajax` method includes a 'headers' option
         * which lets you set any headers you like
         */
        var securityUser = authenticationProvider.get("security-user");
        if (securityUser) {
            var cutomizedOptions = _.extend({
                beforeSend: function(xhr) {
                    var authToken = securityUser.auth_token;
                    console.log("Authentication Token: >>", authToken);
                    if (authToken) xhr.setRequestHeader("Authorization", authToken);
                }
            }, options);
        }
        /*
         * Call the stored original Backbone.sync method with
         * extra headers argument added
         */
        backboneSync(method, model, cutomizedOptions ? cutomizedOptions : options);
    };
    /****************************************************
     * Wolf App Main Entrance.
     ****************************************************/
    module.exports = {
        init: function() {
            // set the app namespace instancing the router
            var WolfApp = {
                ROOT: "/wolf-app",
                APP_ROUTERS: [ new appRouter() ]
            };
            // start the Backbone push navigation
            Backbone.history.start({
                root: WolfApp.ROOT,
                pushState: false,
                hashChange: true
            });
        }
    };
});

define("wolf-app/app-main/0.0.1/app-router-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-security-debug", "app-core-debug", "wolf-app/app-main/0.0.1/app-base-router-debug", "app-dashboard-debug", "app-generic-filter-debug", "app-user-mgmt-debug", "app-user-group-mgmt-debug", "app-role-mgmt-debug", "app-privilege-mgmt-debug", "app-criteria-mgmt-debug", "app-vehicle-mgmt-debug", "app-layout-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var securityApp = require("app-security-debug").SecurityApp;
    var authenticationProvider = require("app-security-debug").AuthenticationProvider;
    var appCore = require("app-core-debug");
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    var AppBaseRouter = require("wolf-app/app-main/0.0.1/app-base-router-debug");
    var AppRouter = {};
    AppRouter.Router = AppBaseRouter.extend({
        initialize: function() {
            // ---------------- Register Events -------------------//
            eventBus.on("layout:switch-module-action", this.switch_module_action, this);
            eventBus.on("layout:discard-layout-action", this.discard_layout_action, this);
            // setup the ajax links for the html5 push navigation
            $("#main-body").on("click", "a:not(a[data-bypass])", function(e) {
                // block the default link behavior
                e.preventDefault();
                // take the href of the link clicked
                var href = $(this).attr("href");
                var prev_href = "#" + Backbone.history.fragment;
                // pass this link to Backbone
                if (href === prev_href) {
                    Backbone.history.loadUrl(prev_href);
                } else {
                    Backbone.history.navigate(href, {
                        trigger: true,
                        replace: false
                    });
                }
            });
        },
        // ------------------ Event Actions ---------------------//
        switch_module_action: function() {
            var self = this;
            this.predict_layout_existence(function() {
                self.switch_module();
            });
        },
        discard_layout_action: function() {
            AppRouter.layoutApp = null;
            viewManager.discardLayout();
        },
        /**
         * Swith modular views.
         * TODO: extract uri to constants.
         */
        switch_module: function() {
            eventBus.trigger("layout:active-menu-item");
            switch (Backbone.history.fragment) {
              case "dashboard/":
                require("app-dashboard-debug").DashboardApp.run(viewManager);
                break;

              case "generic-filter/":
                require("app-generic-filter-debug").GenericFilterApp.run(viewManager);
                break;

              case "user-mgmt/":
                require("app-user-mgmt-debug").UserMgmtApp.run(viewManager);
                break;

              case "user-group-mgmt/":
                require("app-user-group-mgmt-debug").UserGrpMgmtApp.run(viewManager);
                break;

              case "role-mgmt/":
                require("app-role-mgmt-debug").RoleMgmtApp.run(viewManager);
                break;

              case "privilege-mgmt/":
                require("app-privilege-mgmt-debug").PrivilegeMgmtApp.run(viewManager);
                break;

              case "criteria-mgmt/":
                require("app-criteria-mgmt-debug").CriteriaMgmtApp.run(viewManager);
                break;

              case "vehicle-mgmt/":
                require("app-vehicle-mgmt-debug").VehicleMgmtApp.run(viewManager);
                break;
            }
        },
        // ----------------- Backbone Routers ------------------//
        routes: {
            "": "home",
            "security/*subrouter": "invokeSecurityModule",
            "dashboard/*subrouter": "invokeDashboardModule",
            "vehicle-mgmt/*subrouter": "invokeVehicleModule",
            "user-group-mgmt/*subrouter": "invokeUserGroupModule",
            "user-mgmt/*subrouter": "invokeUserModule",
            "role-mgmt/*subrouter": "invokeRoleModule",
            "privilege-mgmt/*subrouter": "invokePrivilegeModule",
            "criteria-mgmt/*subrouter": "invokeCriteriaModule",
            "generic-filter/*subrouter": "invokeGenericFilterModule",
            "*error": "not_found"
        },
        // ------------------ Before & After Router Interceptor ---------------------//
        before: function(params, next) {
            var isAuthenticated = authenticationProvider.get("authenticated");
            var redirectUrl = Backbone.history.location.hash;
            var isSecurityResource = _.contains(App.SECURITY_RESOURCES, redirectUrl);
            var isCancelAccessResource = _.contains(App.CANCELLED_WHILE_AUTH_DONE, redirectUrl);
            if (!isAuthenticated && isSecurityResource) {
                // if user not authenticated and try to access security resources,
                // will be navigate to login page.
                authenticationProvider.put("redirect-url", redirectUrl);
                return Backbone.history.navigate("#security/login", {
                    trigger: true
                });
            }
            if (isAuthenticated && isCancelAccessResource) {}
            // everythin is fine then go ahead.
            return next();
        },
        after: function() {},
        home: function() {
            Backbone.history.navigate("security/login", true);
        },
        invokeSecurityModule: function(subroute) {
            if (!AppRouter.securityRouter) {
                AppRouter.securityRouter = require("app-security-debug").SecurityApp.invokeSecurityRouter();
            }
        },
        invokeDashboardModule: function() {
            this.predict_layout_existence(function() {
                if (!AppRouter.dashboardRouter) {
                    AppRouter.dashboardRouter = require("app-dashboard-debug").DashboardApp.invokeDashboardRouter();
                }
            });
        },
        invokeVehicleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.vehicleRouter) {
                    AppRouter.vehicleRouter = require("app-vehicle-mgmt-debug").VehicleMgmtApp.invokeVehicleRouter();
                }
            });
        },
        invokeUserGroupModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.userGroupRouter) {
                    AppRouter.userGroupRouter = require("app-user-group-mgmt-debug").UserGrpMgmtApp.invokeUserGroupRouter();
                }
            });
        },
        invokeUserModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.userRouter) {
                    AppRouter.userRouter = require("app-user-mgmt-debug").UserMgmtApp.invokeUserRouter();
                }
            });
        },
        invokeRoleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.roleRouter) {
                    AppRouter.roleRouter = require("app-role-mgmt-debug").RoleMgmtApp.invokeRoleRouter();
                }
            });
        },
        invokePrivilegeModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.privilegeRouter) {
                    AppRouter.privilegeRouter = require("app-privilege-mgmt-debug").PrivilegeMgmtApp.invokePrivilegeRouter();
                }
            });
        },
        invokeCriteriaModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.criteriaRouter) {
                    AppRouter.criteriaRouter = require("app-criteria-mgmt-debug").CriteriaMgmtApp.invokeCriteriaRouter();
                }
            });
        },
        invokeGenericFilterModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.genericFilterRouter) {
                    AppRouter.genericFilterRouter = require("app-generic-filter-debug").GenericFilterApp.invokeGenericFilterRouter();
                }
            });
        },
        not_found: function() {
            eventBus.trigger("render-404");
        },
        predict_layout_existence: function(callback) {
            if (AppRouter.layoutApp) {
                return callback();
            }
            AppRouter.layoutApp = require("app-layout-debug").LayoutApp;
            AppRouter.layoutApp.retain = true;
            viewManager.showLayout("#layout-container", AppRouter.layoutApp, function() {
                callback();
            });
        }
    });
    module.exports = AppRouter.Router;
});

/**
 * Override default Backbone router.
 *
 * - Add before/after router interceptor.
 */
define("wolf-app/app-main/0.0.1/app-base-router-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var appBaseRouter = Backbone.Router.extend({
        before: function() {},
        after: function() {},
        route: function(route, name, callback) {
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = "";
            }
            if (!callback) callback = this[name];
            var router = this;
            Backbone.history.route(route, function(fragment) {
                var args = router._extractParameters(route, fragment);
                var next = function() {
                    callback && callback.apply(router, args);
                    router.trigger.apply(router, [ "route:" + name ].concat(args));
                    router.trigger("route", name, args);
                    Backbone.history.trigger("route", router, name, args);
                    router.after.apply(router, args);
                };
                router.before.apply(router, [ args, next ]);
            });
            return this;
        }
    });
    module.exports = appBaseRouter;
});
