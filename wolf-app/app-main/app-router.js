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
            eventBus.on('check-layout-action', this.check_layout_action, this);
            eventBus.on('logout-action', this.logout_action, this);

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
        // TODO: need refactor.
        check_layout_action: function() {
            this.predict_layout_existence(function() {
                eventBus.trigger('switch-view');
            });
        },

        logout_action: function() {
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

        // ----------------- Define Security Resources -------------------//
        /**
         *  Resource that need be authorized
         */
        security_resources: ['#dashboard/', '#vehicle-mgmt/', '#user-group-mgmt/', '#user-mgmt/', '#role-mgmt/', '#privilege-mgmt/', '#criteria-mgmt/', '#generic-filter/'],
        /**
         * Resource that is public
         */
        public_resources: ['', '#security/login', '#security/forgot-password', '#security/reset-password'],
        /**
         * Cancelled access resources while user authenticated.
         */
        cancelled_while_auth_done: ['#security/login'],

        // ------------------ Before & After Router Interceptor ---------------------//
        before: function(params, next){
            var isAuthenticated = authenticationProvider.get('authenticated');
            var redirectUrl = Backbone.history.location.hash;
            var isSecurityResource = _.contains(this.security_resources, redirectUrl);
            var isCancelAccessResource = _.contains(this.cancelled_while_auth_done, redirectUrl);

            if(!isAuthenticated && isSecurityResource){
                // if user not authenticated and try to access security resources,
                // will be navigate to login page.
                authenticationProvider.put('redirect-url', redirectUrl);
                return Backbone.history.navigate('#security/login', { trigger : true });
            }

            if(isAuthenticated && isCancelAccessResource){
                // if user has been authenticated and try to access cancelled pages,
                // will be redirect to dashboard page directly.
                return Backbone.history.navigate('#dashboard/', { trigger : true });
            }

            // everythin is fine then go ahead.
            return next();
        },

        after: function(){
            //console.log('After Router Interceptor....');
        },

        home: function() {
            Backbone.history.navigate('security/login', true);
        },

        invokeSecurityModule: function(subroute) {
            if (!AppRouter.securityRouter) {
                var securityRouter = require('../security/router/security-router');
                AppRouter.securityRouter = new securityRouter('security/', {
                    createTrailingSlashRoutes: true
                });
            }
        },

        invokeDashboardModule: function() {
            this.predict_layout_existence(function() {
                if (!AppRouter.dashboardRouter) {
                    var dashboardRouter = require('../dashboard/router/dashboard-router');
                    AppRouter.dashboardRouter = new dashboardRouter('dashboard/', {
                        createTrailingSlashRoutes: true
                    });
                }
            });
        },

        invokeVehicleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.vehicleRouter) {
                    var vehicleRouter = require('../vehicle-mgmt/router/vehicle-router');
                    AppRouter.vehicleRouter = new vehicleRouter('vehicle-mgmt/', {
                        createTrailingSlashRoutes: true
                    });
                }
            });
        },

        invokeUserGroupModule: function(subroute) {
            var userGroupRouter = require('../user-group-mgmt/router/user-group-router');
            this.predict_layout_existence(function() {
                if (!AppRouter.userGroupRouter) {
                    AppRouter.userGroupRouter = new userGroupRouter('user-group-mgmt/', {
                        createTrailingSlashRoutes: true
                    });
                }
            });
        },

        invokeUserModule: function(subroute) {
            var userRouter = require('../user-mgmt/router/user-router');
            this.predict_layout_existence(function() {
                if (!AppRouter.userRouter) {
                    AppRouter.userRouter = new userRouter('user-mgmt/', {
                        createTrailingSlashRoutes: true
                    });
                }
            });
        },

        invokeRoleModule: function(subroute) {
            var roleRouter = require('../role-mgmt/router/role-router');
            this.predict_layout_existence(function() {
                if (!AppRouter.roleRouter) {
                    AppRouter.roleRouter = new roleRouter('role-mgmt/', {
                        createTrailingSlashRoutes: true
                    });
                }
            });
        },

        invokePrivilegeModule: function(subroute) {
            var privilegeRouter = require('../privilege-mgmt/router/privilege-router');
            this.predict_layout_existence(function() {
                if (!AppRouter.privilegeRouter) {
                    AppRouter.privilegeRouter = new privilegeRouter('privilege-mgmt/', {
                        createTrailingSlashRoutes: true
                    });
                }
            });
        },

        invokeCriteriaModule: function(subroute) {
            var criteriaRouter = require('../criteria-mgmt/router/criteria-router');
            this.predict_layout_existence(function() {
                if (!AppRouter.criteriaRouter) {
                    AppRouter.criteriaRouter = new criteriaRouter('criteria-mgmt/', {
                        createTrailingSlashRoutes: true
                    });
                }
            });
        },

        invokeGenericFilterModule: function(subroute) {
            this.predict_layout_existence(function() {
                if (!AppRouter.genericFilterRouter) {
                    var genericFilterRouter = require('../generic-filter/router/generic-filter-router');
                    AppRouter.genericFilterRouter = new genericFilterRouter('generic-filter/', {
                        createTrailingSlashRoutes: true
                    });
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
