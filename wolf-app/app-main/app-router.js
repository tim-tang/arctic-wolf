define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityApp = require('../security/security-app');
    var eventBus = require('./app-eventbus');
    var viewManager = require('./app-view-manager');
    var AppRouter = {};

    AppRouter.Router = Backbone.Router.extend({
        initialize: function() {
            // setup the ajax links for the html5 push navigation
            $("#main-body").on("click", "a:not(a[data-bypass])", function(e) {
                // block the default link behavior
                e.preventDefault();

                // take the href of the link clicked
                var href = $(this).attr("href");
                //var protocol = this.protocol + "//";
                //var prev_href = window.location.pathname + window.location.search;
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

        // set the backbone routes
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

        home: function() {
            Backbone.history.navigate('security/login', true);
        },

        invokeSecurityModule: function(subroute){
            if(!AppRouter.securityRouter) {
                var securityRouter = require('../security/router/security-router');
                AppRouter.securityRouter = new securityRouter('security/', {createTrailingSlashRoutes: true});
            }
        },

        invokeDashboardModule: function() {
            alert('xxxx');
            this.predict_layout_existence(function(){
                if(!AppRouter.dashboardRouter){
                    var dashboardRouter = require('../dashboard/router/dashboard-router');
                    AppRouter.dashboardRouter = new dashboardRouter('dashboard/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeVehicleModule: function(subroute) {
            this.predict_layout_existence(function() {
                if(!AppRouter.vehicleRouter) {
                    var vehicleRouter = require('../vehicle-mgmt/router/vehicle-router');
                    AppRouter.vehicleRouter = new vehicleRouter('vehicle-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeUserGroupModule: function(subroute) {
            var userGroupRouter = require('../user-group-mgmt/router/user-group-router');
            this.predict_layout_existence(function() {
                if(!AppRouter.userGroupRouter) {
                    AppRouter.userGroupRouter = new userGroupRouter('user-group-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeUserModule: function(subroute) {
            var userRouter = require('../user-mgmt/router/user-router');
            this.predict_layout_existence(function() {
                if(!AppRouter.userRouter) {
                    AppRouter.userRouter = new userRouter('user-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeRoleModule: function(subroute) {
            var roleRouter = require('../role-mgmt/router/role-router');
            this.predict_layout_existence(function() {
                if(!AppRouter.roleRouter) {
                    AppRouter.roleRouter = new roleRouter('role-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokePrivilegeModule: function(subroute) {
            var privilegeRouter = require('../privilege-mgmt/router/privilege-router');
            this.predict_layout_existence(function() {
                if(!AppRouter.privilegeRouter) {
                    AppRouter.privilegeRouter = new privilegeRouter('privilege-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeCriteriaModule: function(subroute) {
            var criteriaRouter = require('../criteria-mgmt/router/criteria-router');
            this.predict_layout_existence(function() {
                if(!AppRouter.criteriaRouter) {
                    AppRouter.criteriaRouter = new criteriaRouter('criteria-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeGenericFilterModule: function(subroute) {
            this.predict_layout_existence(function() {
                if(!AppRouter.genericFilterRouter){
                    var genericFilterRouter = require('../generic-filter/router/generic-filter-router');
                    AppRouter.genericFilterRouter = new genericFilterRouter('generic-filter/', {createTrailingSlashRoutes: true});
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
            viewManager.showLayout('#main-body', AppRouter.layoutApp, function(){
                callback();
            });
        }
    });

    module.exports = AppRouter.Router;
});
