define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityLogin = require('./view/security-login');
    var forgotPassword = require('./view/forgot-password');
    var resetPassword = require('./view/reset-password');
    var notFound = require('./view/404');
    var internalError = require('./view/500');
    var eventBus = require('../app-main/app-eventbus');

    var securityApp = new Backbone.Layout({

        el: '#main-body',

        initialize: function() {
            eventBus.on('render-security-login', this.render_security_login, this);
            eventBus.on('render-forgot-password', this.render_forgot_password, this);
            eventBus.on('render-reset-password', this.render_reset_password, this);
            eventBus.on('render-security-login', this.render_security_login, this);
            eventBus.on('render-404', this.render_404, this);
            eventBus.on('render-500', this.render_500, this);
        },

        beforeRender: function() {
            //TODO:
        },

        afterRender: function() {
            //TODO:
        },

        render_security_login: function() {
            this.$el.html('');
            $('#main-body').addClass('texture');
            this.insertView('', new securityLogin()).render();
        },

        render_security_logou: function() {
            this.$el.html('');
            this.render_security_login();
        },

        render_forgot_password: function() {
            this.removeView('');
            this.insertView('', new forgotPassword()).render();
        },

        render_reset_password: function() {
            this.insertView('', new resetPassword()).render();
        },

        render_404: function() {
            this.$el.html('')
            this.insertView('', new notFound()).render();
        },

        render_500: function() {
            this.$el.html('')
            this.insertView('', new internalError()).render();
        }
    });

    module.exports = securityApp;
});
