define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityApp = require('../security/security-app');
    var commonLoading = require('../common/common-loading');
    var layoutRouter = require('../layout/router/layout-router');

    var AppRouter = {};
    AppRouter.Router = Backbone.Router.extend({
        initialize: function() {
            // init layout route
            AppRouter.layoutRouter = new layoutRouter();
            // setup the ajax links for the html5 push navigation
            $("#main-body").on("click", "a:not(a[data-bypass])", function(e) {
                // block the default link behavior
                e.preventDefault();

                commonLoading.init('#main-body');
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
            'forgot-password': 'forgot_password',
            'reset-password': 'reset_password',
            '*error': 'not_found',
        },

        home: function() {
            securityApp.$el.html('');
            securityApp.render();
        },

        forgot_password: function() {
            securityApp.trigger('render-forgot-password');
        },

        reset_password: function() {
            securityApp.trigger('render-reset-password');
        },

        not_found: function() {
            securityApp.trigger('render-404');
        }
    });

    module.exports = AppRouter.Router;

});