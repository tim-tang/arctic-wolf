define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var securityApp = require('../security/index').SecurityApp;
    var authenticationProvider = require('../security/index').AuthenticationProvider;
    var appCore = require('../app-core/index');
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
                require('../dashboard/index').DashboardApp.run(viewManager);
                break;
            case "generic-filter/":
                require('../generic-filter/index').GenericFilterApp.run(viewManager);
                break;
            case "user-mgmt/":
                require('../user-mgmt/index').UserMgmtApp.run(viewManager);
                break;
            case "user-group-mgmt/":
                require('../user-group-mgmt/index').UserGrpMgmtApp.run(viewManager);
                break;
            case "role-mgmt/":
                require('../role-mgmt/index').RoleMgmtApp.run(viewManager);
                break;
            case "privilege-mgmt/":
                require('../privilege-mgmt/index').PrivilegeMgmtApp.run(viewManager);
                break;
            case "criteria-mgmt/":
                require('../criteria-mgmt/index').CriteriaMgmtApp.run(viewManager);
                break;
            case "vehicle-mgmt/":
                require('../vehicle-mgmt/index').VehicleMgmtApp.run(viewManager);
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
                AppRouter.securityRouter = require('../security/index').SecurityApp.invokeSecurityRouter();
            }
        },

        invokeDashboardModule: function() {
            this.predict_layout_existence(function() {
                if (!AppRouter.dashboardRouter) {
                    AppRouter.dashboardRouter = require('../dashboard/index').DashboardApp.invokeDashboardRouter();
                }
            });
        },

        invokeVehicleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.vehicleRouter) {
                    AppRouter.vehicleRouter = require('../vehicle-mgmt/index').VehicleMgmtApp.invokeVehicleRouter();
                }
            });
        },

        invokeUserGroupModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.userGroupRouter) {
                    AppRouter.userGroupRouter = require('../user-group-mgmt/index').UserGrpMgmtApp.invokeUserGroupRouter();
                }
            });
        },

        invokeUserModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.userRouter) {
                    AppRouter.userRouter = require('../user-mgmt/index').UserMgmtApp.invokeUserRouter();
                }
            });
        },

        invokeRoleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.roleRouter) {
                    AppRouter.roleRouter = require('../role-mgmt/index').RoleMgmtApp.invokeRoleRouter();
                }
            });
        },

        invokePrivilegeModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.privilegeRouter) {
                    AppRouter.privilegeRouter = require('../privilege-mgmt/index').PrivilegeMgmtApp.invokePrivilegeRouter();
                }
            });
        },

        invokeCriteriaModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.criteriaRouter) {
                    AppRouter.criteriaRouter = require('../criteria-mgmt/index').CriteriaMgmtApp.invokeCriteriaRouter();
                }
            });
        },

        invokeGenericFilterModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.genericFilterRouter) {
                    AppRouter.genericFilterRouter = require('../generic-filter/index').GenericFilterApp.invokeGenericFilterRouter();
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
            AppRouter.layoutApp = require('../layout/index').LayoutApp;
            AppRouter.layoutApp.retain = true;
            viewManager.showLayout('#layout-container', AppRouter.layoutApp, function() {
                callback();
            });
        }
    });

    module.exports = AppRouter.Router;
});
