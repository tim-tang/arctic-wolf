define(function(require, exports, module) {

    var Backbone = require('backbone');
    var eventBus = require('../../app-core/index').Eventbus;
    var authenticationProvider = require('../../security/authentication/authentication-provider');

    var layoutProfile = Backbone.View.extend({
        manage: true,
        prefix: "layout/templates/",
        template: 'layout-profile.html',

        events: {
            'click #sign-out': 'sign_out'
        },

        sign_out: function(e) {
            e.preventDefault();
            authenticationProvider.signout(function() {
                eventBus.trigger('layout:discard-layout-action');
                Backbone.history.navigate('security/login', true);
            });
        }
    });

    module.exports = layoutProfile;
});
