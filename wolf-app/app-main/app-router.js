define(function(require, exports, module) {

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
});
