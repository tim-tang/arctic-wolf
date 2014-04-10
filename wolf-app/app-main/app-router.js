define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityApp = require('../security/security-app');
    var layoutApp = require('../layout/layout-app');

    var appRouter = Backbone.Router.extend({
        initialize: function() {
            // setup the ajax links for the html5 push navigation
            $("#main-body").on("click", "a:not(a[data-bypass])", function(e) {
                // block the default link behavior
                e.preventDefault();
                $('#loading').remove();
                var parent = $('#main-body');
                var loading = $('<div id="loading" class="loading"><i class="fa fa-spinner"></i></div>');
                loading.appendTo(parent);
                loading.fadeIn(0);

                // take the href of the link clicked
                var href = $(this).attr("href");
                //var protocol = this.protocol + "//";
                //var prev_href = window.location.pathname + window.location.search;
                var prev_href = '/' + Backbone.history.fragment;
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

        // set the backbone routes
        routes: {
            '': 'security_login',
            'forgot-password': 'forgot_password',
            'reset-password': 'reset_password',
            'dashboard': 'dashboard',
            '*error': 'not_found'
        },

        security_login: function(){
            securityApp.render();
        },

        forgot_password: function() {
            securityApp.render_forgot_password();
        },

        reset_password: function() {
            securityApp.render_reset_password();
        },

        dashboard: function() {
            layoutApp.render();
        },

        not_found: function() {
            alert('NO Kidding Not Found!');
        }

    });

    module.exports = appRouter;
});
