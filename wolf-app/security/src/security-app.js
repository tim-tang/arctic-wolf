define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');

    var appCore = require('app-core');
    var appCommon = require('app-common');

    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    var commonLoading = appCommon.CommonLoading;

    var securityApp = new Backbone.Layout({

        el: '#main-body',

        initialize: function() {
            eventBus.on('security:show-loading', this.show_loading, this);
            eventBus.on('security:hide-loading', this.hide_loading, this);
            eventBus.on('render-security-login', this.render_security_login, this);
            eventBus.on('render-forgot-password', this.render_forgot_password, this);
            eventBus.on('render-reset-password', this.render_reset_password, this);
            eventBus.on('render-404', this.render_404, this);
            eventBus.on('render-500', this.render_500, this);
        },

        beforeRender: function() {
        },

        afterRender: function() {
            //TODO:
        },

        render_security_login: function() {
            require('./view/security-login').run('#security-container', viewManager);
        },

        render_forgot_password: function() {
            require('./view/forgot-password').run('#security-container', viewManager);
        },

        render_reset_password: function() {
            require('./view/reset-password').run('#security-container', viewManager);
        },

        render_404: function() {
            require('./view/404').run('#security-container', viewManager);
        },

        render_500: function() {
            require('./view/500').run('#security-container', viewManager);
        },

        show_loading: function() {
            commonLoading.init('#security-container');
        },

        hide_loading: function() {
            commonLoading.destroy();
        },

        invokeSecurityRouter: function() {
            var securityRouter = require('./router/security-router');
            return new securityRouter('security/', {
                createTrailingSlashRoutes: true
            });
        }
    });

    module.exports = securityApp;
});
