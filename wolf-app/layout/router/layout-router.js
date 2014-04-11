define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    require('layoutmanager');
    var naviSwitcher = require('../../common/navi-switcher');

    var appRouter = Backbone.Router.extend({
        initialize: function() {

            // setup the ajax links for the html5 push navigation
            $("#main-menu").on("click", "a:not(a[data-bypass])", function(e) {
                // block the default link behavior
                e.preventDefault();
                $('#loading').remove();
                var parent = $('#main-content');
                var loading = $('<div id="loading" class="loading"><i class="fa fa-spinner"></i></div>');
                loading.appendTo(parent);
                loading.fadeIn(0);

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
                        replace: true
                    });
                }
            });
        },

        // set the Backbone routes
        routes: {
            'dashboard': 'dashboard',
            'product-search': 'product_search',
            'vehicle-mgmt': 'vehicle_mgmt'
        },

        dashboard: function() {
            this.predict_layout_existence();
        },

        product_search: function() {
            //$('#main-content').html($(msg).find('#main-content').html());
            //$('#main-content').fadeIn();
            //var newTitle = $(msg).filter('title').text();
            //$('title').text(newTitle);
            alert('In product search.');
        },

        vehicle_mgmt: function() {
            this.predict_layout_existence();
            this.layoutApp.switch_view();
        },

        predict_layout_existence: function() {
            if (!this.layoutApp) {
                this.layoutApp = require('../layout-app');
                this.layoutApp.render();
            }
        }

    });

    module.exports = appRouter;
});
