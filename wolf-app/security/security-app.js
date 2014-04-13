define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityLogin = require('./view/security-login');
    var forgotPassword = require('./view/forgot-password');
    var resetPassword = require('./view/reset-password');
    var notFound = require('./view/404');

    var securityApp =new Backbone.Layout({

        el: '#main-body',

        beforeRender: function(){
            $('#main-body').addClass('texture');
        },

        afterRender: function() {
            this.render_security_login();
        },

        render_security_login: function() {
            this.removeView('');
            this.insertView('', new securityLogin()).render();
        },

        render_forgot_password: function(){
            this.removeView('');
            this.insertView('', new forgotPassword()).render();
        },

        render_reset_password: function(){
            this.insertView('', new resetPassword()).render();
        },

        render_404: function() {
            this.removeView('');
            this.insertView('', new notFound()).render();
        }
    });

    module.exports = securityApp;
});
