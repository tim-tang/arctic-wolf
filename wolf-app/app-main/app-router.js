define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var securityApp = require('../security/security-app');
    var eventBus = require('./app-eventbus');
    var viewManager = require('./app-view-manager');
    var AppBaseRouter = require('./app-base-router');
    var authenticationProvider = require('../security/authentication/authentication-provider');

    var AppRouter = {};
    AppRouter.Router = AppBaseRouter.extend({

        initialize: function() {
            // ---------------- Register Events -------------------//
            eventBus.on('layout:check-layout-action', this.check_layout_action, this);
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
        check_layout_action: function() {
            this.predict_layout_existence(function() {
                eventBus.trigger('switch-view');
            });
        },

        discard_layout_action: function() {
            AppRouter.layoutApp = null;
            viewManager.discardLayout();
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
                AppRouter.securityRouter = require('../security/security-app').invokeSecurityRouter();
            }
        },

        invokeDashboardModule: function() {
            this.predict_layout_existence(function() {
                if (!AppRouter.dashboardRouter) {
                    AppRouter.dashboardRouter = require('../dashboard/dashboard-app').invokeDashboardRouter();
                }
            });
        },

        invokeVehicleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.vehicleRouter) {
                    AppRouter.vehicleRouter = require('../vehicle-mgmt/vehicle-app').invokeVehicleRouter();
                }
            });
        },

        invokeUserGroupModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.userGroupRouter) {
                    AppRouter.userGroupRouter = require('../user-group-mgmt/user-group-app').invokeUserGroupRouter();
                }
            });
        },

        invokeUserModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.userRouter) {
                    AppRouter.userRouter = require('../user-mgmt/user-app').invokeUserRouter();
                }
            });
        },

        invokeRoleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.roleRouter) {
                    AppRouter.roleRouter = require('../role-mgmt/role-app').invokeRoleRouter();
                }
            });
        },

        invokePrivilegeModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.privilegeRouter) {
                    AppRouter.privilegeRouter = require('../privilege-mgmt/privilege-app').invokePrivilegeRouter();
                }
            });
        },

        invokeCriteriaModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.criteriaRouter) {
                    AppRouter.criteriaRouter = require('../criteria-mgmt/criteria-app').invokeCriteriaRouter();
                }
            });
        },

        invokeGenericFilterModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.genericFilterRouter) {
                    AppRouter.genericFilterRouter = require('../generic-filter/generic-filter-app').invokeGenericFilterRouter();
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
            AppRouter.layoutApp = require('../layout/layout-app');
            AppRouter.layoutApp.retain = true;
            viewManager.showLayout('#layout-container', AppRouter.layoutApp, function() {
                callback();
            });
        }
    });

    module.exports = AppRouter.Router;
});
