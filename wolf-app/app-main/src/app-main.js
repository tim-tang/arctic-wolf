define(function(require, exports, module) {

    var $ = require('$');
    window._ = require('underscore');
    var Backbone = require('backbone');
    require('layoutmanager');
    var authenticationProvider = require('app-security').AuthenticationProvider;
    var appRouter = require('./app-router');
    window.App = require('app-common').CommonConstants;

    /****************************************************
     * Backbone Layout Manager Configuration.
     ****************************************************/
    Backbone.Layout.configure({
        // Set the prefix to where your templates live on the server, but keep in
        // mind that this prefix needs to match what your production paths will be.
        // Typically those are relative.  So we'll add the leading `/` in `fetch`.
        prefix: "wolf-app/",

        // This method will check for prebuilt templates first and fall back to
        // loading in via AJAX.
        fetchTemplate: function(path) {
            if (seajs.production) {
                // Check for a global JST object.  When you build your templates for
                // production, ensure they are all attached here.
                var JST = window.JST || {};

                // If the path exists in the object, use it instead of fetching remotely.
                if (JST[path]) {
                    return JST[path];
                }
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

    /****************************************************
     * Override original backbone sync.
     ****************************************************/
    var backboneSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {

        /*
         * Change the `url` property of options.
         */
        options = _.extend(options, {
            url: App.WS_HOST + (_.isFunction(model.url) ? model.url() : model.url)
        });

        /**
         * The jQuery `ajax` method includes a 'headers' option
         * which lets you set any headers you like
         */
        var securityUser = authenticationProvider.get('security-user');
        if (securityUser) {
            var cutomizedOptions = _.extend({
                beforeSend: function(xhr) {
                    var authToken = securityUser.auth_token;
                    console.log('Authentication Token: >>', authToken);
                    if (authToken) xhr.setRequestHeader('Authorization', authToken);
                }
            }, options)
        }

        /*
         * Call the stored original Backbone.sync method with
         * extra headers argument added
         */
        backboneSync(method, model, cutomizedOptions ? cutomizedOptions : options);
    };


    /****************************************************
     * Wolf App Main Entrance.
     ****************************************************/
    module.exports = {
        init: function() {
            // set the app namespace instancing the router
            var WolfApp = {
                ROOT: "/wolf-app",
                APP_ROUTERS: [
                new appRouter()]
            };
            // start the Backbone push navigation
            Backbone.history.start({
                root: WolfApp.ROOT,
                pushState: false,
                hashChange: true
            });
        }
    };
});
