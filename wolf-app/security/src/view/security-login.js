define(function(require, exports, module) {

    var Backbone = require('backbone');
    var $ = require('$');
    require('parsley');
    var securityFooter = require('./security-footer');
    var authenticationProvider = require('../authentication/authentication-provider');
    var eventBus = require('app-core').Eventbus;

    var securityLogin = Backbone.View.extend({

        manage: true,
        prefix: 'security/src/tpl/',
        template: 'security-login.html',

        initialize: function() {

        },

        afterRender: function() {
            var layoutFooterView = new securityFooter();
            this.insertView('.middle-login', layoutFooterView).render();
            //$.i18n.setDefaultNamespace('security');
            this.$el.i18n();
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
