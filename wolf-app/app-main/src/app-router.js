define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var securityApp = require('app-security').SecurityApp;
    var authenticationProvider = require('app-security').AuthenticationProvider;
    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    var AppBaseRouter = require('./app-base-router');

    var AppRouter = {};
    AppRouter.Router = AppBaseRouter.extend({

        initialize: function() {
            // ---------------- Register Events -------------------//
            eventBus.on('layout:switch-module-action', this.switch_module_action, this);
            eventBus.on('layout:discard-layout-action', this.discard_layout_action, this);

            // setup the ajax links for the html5 push navigation
            $("#main-body").on("click", "a:not(a[data-bypass])", function(e) {
                // block the default link behavior
                e.preventDefault();

                // take the href of the link clicked
                var href = $(this).attr("href");
                var prev_href = '#' + Backbone.history.fragment;
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
            eventBus.trigger('layout:active-menu-item');
            switch (Backbone.history.fragment) {
            case "dashboard/":
                require('app-dashboard').DashboardApp.run(viewManager);
                break;
            case "generic-filter/":
                require('app-generic-filter').GenericFilterApp.run(viewManager);
                break;
            case "user-mgmt/":
                require('app-user-mgmt').UserMgmtApp.run(viewManager);
                break;
            case "user-group-mgmt/":
                require('app-user-group-mgmt').UserGrpMgmtApp.run(viewManager);
                break;
            case "role-mgmt/":
                require('app-role-mgmt').RoleMgmtApp.run(viewManager);
                break;
            case "privilege-mgmt/":
                require('app-privilege-mgmt').PrivilegeMgmtApp.run(viewManager);
                break;
            case "criteria-mgmt/":
                require('app-criteria-mgmt').CriteriaMgmtApp.run(viewManager);
                break;
            case "vehicle-mgmt/":
                require('app-vehicle-mgmt').VehicleMgmtApp.run(viewManager);
                break;
            }
        },

        // ----------------- Backbone Routers ------------------//
        routes: {
            '': 'home',
            'security/*subrouter': 'invokeSecurityModule',
            'dashboard/*subrouter': 'invokeDashboardModule',
            'vehicle-mgmt/*subrouter': 'invokeVehicleModule',
            'user-group-mgmt/*subrouter': 'invokeUserGroupModule',
            'user-mgmt/*subrouter': 'invokeUserModule',
            'role-mgmt/*subrouter': 'invokeRoleModule',
            'privilege-mgmt/*subrouter': 'invokePrivilegeModule',
            'criteria-mgmt/*subrouter': 'invokeCriteriaModule',
            'generic-filter/*subrouter': 'invokeGenericFilterModule',
            '*error': 'not_found',
        },


        // ------------------ Before & After Router Interceptor ---------------------//
        before: function(params, next) {
            var isAuthenticated = authenticationProvider.get('authenticated');
            var redirectUrl = Backbone.history.location.hash;
            var isSecurityResource = _.contains(App.SECURITY_RESOURCES, redirectUrl);
            var isCancelAccessResource = _.contains(App.CANCELLED_WHILE_AUTH_DONE, redirectUrl);

            if (!isAuthenticated && isSecurityResource) {
                // if user not authenticated and try to access security resources,
                // will be navigate to login page.
                authenticationProvider.put('redirect-url', redirectUrl);
                return Backbone.history.navigate('#security/login', {
                    trigger: true
                });
            }

            if (isAuthenticated && isCancelAccessResource) {
                // if user has been authenticated and try to access cancelled pages,
                // will be redirect to dashboard page directly.
                //return Backbone.history.navigate('#dashboard/', { trigger : true });
            }

            // everythin is fine then go ahead.
            return next();
        },

        after: function() {
            //console.log('After Router Interceptor....');
        },

        home: function() {
            Backbone.history.navigate('security/login', true);
        },

        invokeSecurityModule: function(subroute) {
            if (!AppRouter.securityRouter) {
                AppRouter.securityRouter = require('app-security').SecurityApp.invokeSecurityRouter();
            }
        },

        invokeDashboardModule: function() {
            this.predict_layout_existence(function() {
                if (!AppRouter.dashboardRouter) {
                    AppRouter.dashboardRouter = require('app-dashboard').DashboardApp.invokeDashboardRouter();
                }
            });
        },

        invokeVehicleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.vehicleRouter) {
                    AppRouter.vehicleRouter = require('app-vehicle-mgmt').VehicleMgmtApp.invokeVehicleRouter();
                }
            });
        },

        invokeUserGroupModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.userGroupRouter) {
                    AppRouter.userGroupRouter = require('app-user-group-mgmt').UserGrpMgmtApp.invokeUserGroupRouter();
                }
            });
        },

        invokeUserModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.userRouter) {
                    AppRouter.userRouter = require('app-user-mgmt').UserMgmtApp.invokeUserRouter();
                }
            });
        },

        invokeRoleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.roleRouter) {
                    AppRouter.roleRouter = require('app-role-mgmt').RoleMgmtApp.invokeRoleRouter();
                }
            });
        },

        invokePrivilegeModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.privilegeRouter) {
                    AppRouter.privilegeRouter = require('app-privilege-mgmt').PrivilegeMgmtApp.invokePrivilegeRouter();
                }
            });
        },

        invokeCriteriaModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.criteriaRouter) {
                    AppRouter.criteriaRouter = require('app-criteria-mgmt').CriteriaMgmtApp.invokeCriteriaRouter();
                }
            });
        },

        invokeGenericFilterModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.genericFilterRouter) {
                    AppRouter.genericFilterRouter = require('app-generic-filter').GenericFilterApp.invokeGenericFilterRouter();
                }
            });
        },

        not_found: function() {
            eventBus.trigger('render-404');
        },

        predict_layout_existence: function(callback) {
            if (AppRouter.layoutApp) {
                return callback();
            }
            AppRouter.layoutApp = require('app-layout').LayoutApp;
            AppRouter.layoutApp.retain = true;
            viewManager.showLayout('#layout-container', AppRouter.layoutApp, function() {
                callback();
            });
        }
    });

    module.exports = AppRouter.Router;
});
