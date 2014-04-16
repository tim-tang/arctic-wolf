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
            //TODO: alter each module to subroute.
            'product-search': 'product_search',
            'logout': 'logout'
        },

        invokeVehicleModule: function(subroute) {
            var vehicleRouter = require('../../vehicle-mgmt/router/vehicle-router');
            this.predict_layout_existence(function(layoutApp){
                if(!LayoutRouter.vehicleRouter){
                    LayoutRouter.vehicleRouter = new vehicleRouter('vehicle-mgmt/', {createTrailingSlashRoutes: true});
                }
            });
        },

		invokeUserGroupModule: function(subroute) {
            var userGroupRouter = require('../../user-group-mgmt/router/user-group-router');
            this.predict_layout_existence(function(layoutApp){
                if(!LayoutRouter.userGroupRouter){
                    LayoutRouter.userGroupRouter = new userGroupRouter('user-group-mgmt/', {createTrailingSlashRoutes: true, layoutApp: layoutApp});
                }
            });
        },

        dashboard: function() {
            this.predict_layout_existence(function(layoutApp){
                //TODO:
            });
        },

        product_search: function() {
            //$('#main-content').html($(msg).find('#main-content').html());
            //$('#main-content').fadeIn();
            //var newTitle = $(msg).filter('title').text();
            //$('title').text(newTitle);
            alert('In product search.');
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
