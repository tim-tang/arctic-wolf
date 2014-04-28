define(function(require, exports, module) {

    var Backbone = require('backbone');
    var $ = require('$');
    require('parsley');
    var layoutApp = require('../../layout/layout-app');
    var layoutFooter = require('../../layout/view/layout-footer');
    var authenticationProvider = require('../authentication/authentication-provider');
    var eventBus = require('../../app-main/app-eventbus');

    var securityLogin = Backbone.View.extend({

        manage: true,
        prefix: 'security/templates/',
        template: 'security-login.html',

        initialize: function() {

        },

        afterRender: function() {
            var layoutFooterView = new layoutFooter();
            this.insertView('.middle-login', layoutFooterView).render();
        },

        events: {
            'submit form': 'authenticate'
        },

        authenticate: function(event) {
            if (event) event.preventDefault();
            if ($('#security-login-form').parsley().validate()) {
                var username = $('#username').val();
                var password = $('#password').val();
                eventBus.trigger('security:show-loading');
                authenticationProvider.authenticate({
                    username: username,
                    password: password
                }, function() {
                    //TODO: server side error handling
                    eventBus.trigger('security:hide-loading');
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
