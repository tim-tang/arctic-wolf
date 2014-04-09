define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    require('layoutmanager');

    Backbone.Layout.configure({
        // Set the prefix to where your templates live on the server, but keep in
        // mind that this prefix needs to match what your production paths will be.
        // Typically those are relative.  So we'll add the leading `/` in `fetch`.
        prefix: "static/templates/",

        // This method will check for prebuilt templates first and fall back to
        // loading in via AJAX.
        fetchTemplate: function(path) {
            // Check for a global JST object.  When you build your templates for
            // production, ensure they are all attached here.
            var JST = window.JST || {};

            // If the path exists in the object, use it instead of fetching remotely.
            if (JST[path]) {
                return JST[path];
            }

            // If it does not exist in the JST object, mark this function as
            // asynchronous.
            var done = this.async();

            // Fetch via jQuery's GET.  The third argument specifies the dataType.
            $.get(path, function(contents) {
                // Assuming you're using underscore templates, the compile step here is
                // `_.template`.
                done(_.template(contents));
            }, "text");
        }
    });

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
                var prev_href = '/' + Backbone.history.fragment;
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
            $('#loading').remove();
        },

        product_search: function() {
            //$('#main-content').html($(msg).find('#main-content').html());
            //$('#main-content').fadeIn();
            //var newTitle = $(msg).filter('title').text();
            //$('title').text(newTitle);
            $('#loading').remove();
        },

        vehicle_mgmt: function() {
            var vehicleApp = require('../../vehicle/vehicle-app');
            vehicleApp = new vehicleApp();
            vehicleApp.render();
            $('#loading').remove();
        }
    });

    module.exports = appRouter;
});
