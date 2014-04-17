define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    require('layoutmanager');

    var LayoutRouter = {};
    LayoutRouter.Router = Backbone.Router.extend({
        initialize: function() {
            // setup the ajax links for the html5 push navigation
            $("#main-menu").on("click", "a:not(a[data-bypass])", function(e) {
                // block the default link behavior
                e.preventDefault();

                // take the href of the link clicked
                var href = $(this).attr("href");
                //var prev_href = window.location.pathname + window.location.search;
                var prev_href = '#' + Backbone.history.fragment;
                // pass this link to Backbone
                if (href == prev_href) {
                    Backbone.history.loadUrl(prev_href);
                } else {
                    Backbone.history.navigate(href, {
                        trigger: true,
                        replace: false
                    });
                }
            });
        },

        // set the Backbone routes
        routes: {
            'dashboard': 'dashboard',
            'vehicle-mgmt/*subrouter': 'invokeVehicleModule',
            'user-group-mgmt/*subrouter': 'invokeUserGroupModule',
            'user-mgmt/*subrouter': 'invokeUserModule',
            'role-mgmt/*subrouter': 'invokeRoleModule',
            'privilege-mgmt/*subrouter': 'invokePrivilegeModule',
            'criteria-mgmt/*subrouter': 'invokeCriteriaModule',
            'generic-filter/*subrouter': 'invokeGenericFilterModule',
            'logout': 'logout'
        },

        dashboard: function() {
            this.predict_layout_existence(function(layoutApp){
                //TODO:
            });
        },

        invokeVehicleModule: function(subroute) {
            this.predict_layout_existence(function(layoutApp) {
                if(!LayoutRouter.vehicleRouter) {
                    var vehicleRouter = require('../../vehicle-mgmt/router/vehicle-router');
                    LayoutRouter.vehicleRouter = new vehicleRouter('vehicle-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

		invokeUserGroupModule: function(subroute) {
            var userGroupRouter = require('../../user-group-mgmt/router/user-group-router');
            this.predict_layout_existence(function(layoutApp) {
                if(!LayoutRouter.userGroupRouter) {
                    LayoutRouter.userGroupRouter = new userGroupRouter('user-group-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeUserModule: function(subroute) {
            var userRouter = require('../../user-mgmt/router/user-router');
            this.predict_layout_existence(function(layoutApp) {
                if(!LayoutRouter.userRouter) {
                    LayoutRouter.userRouter = new userRouter('user-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeRoleModule: function(subroute) {
            var roleRouter = require('../../role-mgmt/router/role-router');
            this.predict_layout_existence(function(layoutApp) {
                if(!LayoutRouter.roleRouter) {
                    LayoutRouter.roleRouter = new roleRouter('role-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokePrivilegeModule: function(subroute) {
            var privilegeRouter = require('../../privilege-mgmt/router/privilege-router');
            this.predict_layout_existence(function(layoutApp) {
                if(!LayoutRouter.privilegeRouter) {
                    LayoutRouter.privilegeRouter = new privilegeRouter('privilege-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeCriteriaModule: function(subroute) {
            var criteriaRouter = require('../../criteria-mgmt/router/criteria-router');
            this.predict_layout_existence(function(layoutApp) {
                if(!LayoutRouter.criteriaRouter) {
                    LayoutRouter.criteriaRouter = new criteriaRouter('criteria-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

        invokeGenericFilterModule: function(subroute) {
            this.predict_layout_existence(function(layoutApp) {
                if(!LayoutRouter.genericFilterRouter){
                    var genericFilterRouter = require('../../generic-filter/router/generic-filter-router');
                    LayoutRouter.genericFilterRouter = new genericFilterRouter('generic-filter/', {createTrailingSlashRoutes: true});
                }
            });
            //var newTitle = $(msg).filter('title').text();
            //$('title').text(newTitle);
            //alert('In product search.');
        },

        logout: function() {
            this.layoutApp = null;
            Backbone.history.loadUrl('#');
        },

        predict_layout_existence: function(callback) {
            if (this.layoutApp) {
                return callback(this.layoutApp);
            }
            this.layoutApp = require('../layout-app');
            var self = this.layoutApp;
            this.layoutApp.render().promise().done(function(){
                callback(self);
            });
        }
    });

    module.exports = LayoutRouter.Router;
});
