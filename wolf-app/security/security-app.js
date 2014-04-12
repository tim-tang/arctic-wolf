define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityLogin = require('./view/security-login');
    var forgotPassword = require('./view/forgot-password');
    var resetPassword = require('./view/reset-password');

    var securityApp =new Backbone.Layout({

        el: '#main-body',


        beforeRender: function(){
            $('#main-body').addClass('texture');
        },

        views: {
            '': new securityLogin()
        },

        render_forgot_password: function(){
            this.removeView('');
            this.insertView('', new forgotPassword()).render();
        },

        render_reset_password: function(){
            this.removeView('');
            this.insertView('', new resetPassword()).render();
        }
    });

    module.exports = securityApp;
});
