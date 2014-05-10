define(function(require, exports, module) {

    var Backbone = require('backbone');
    var eventBus = require('../../app-core/app-core-index').Eventbus;
    require('subroute');

    var securityRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //TODO:
        },

        routes: {
            'login': 'login',
            'forgot-password': 'forgot_password',
            'reset-password': 'reset_password'
        },

        login: function() {
            eventBus.trigger('render-security-login');
        },

        forgot_password: function() {
            eventBus.trigger('render-forgot-password');
        },

        reset_password: function() {
            eventBus.trigger('render-reset-password');
        }
    });

    module.exports = securityRouter;
});
