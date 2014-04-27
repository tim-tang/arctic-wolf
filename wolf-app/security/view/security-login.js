define(function(require, exports, module) {

    var Backbone = require('backbone');
    var $ = require('$');
    require('parsley');
    var layoutApp = require('../../layout/layout-app');
    var layoutFooter = require('../../layout/view/layout-footer');
    var authenticationProvider = require('../authentication/authentication-provider');

    var securityLogin = Backbone.View.extend({

        manage: true,
        prefix: 'security/templates/',
        template: 'security-login.html',

        initialize: function() {
            this.subviews = [];
        },

        afterRender: function() {
            var layoutFooterView = new layoutFooter();
            this.subviews.push(layoutFooterView);
            this.insertView('.middle-login', layoutFooterView).render();
        },

        events: {
            'submit form': 'authenticate'
        },

        authenticate: function(event) {
            if (event) event.preventDefault();
            if ($('#security-login-form').parsley().validate()) {
                console.log('Ready to do backend authentication!');
                var username = $('#username').val();
                var password = $('#password').val();
                authenticationProvider.authenticate({
                    username: username,
                    password: password
                });
            } else {
                console.log('Client side validate error.');
            }
        }
    });

    module.exports = {
        run: function(selector, viewManager) {
            viewManager.showLogin(selector, new securityLogin());
        }
    };
});
