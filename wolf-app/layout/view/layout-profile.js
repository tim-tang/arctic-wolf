define(function(require, exports, module) {

    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');

    var layoutProfile = Backbone.View.extend({
        manage: true,
        prefix: "layout/templates/",
        template: 'layout-profile.html',

        events: {
            'click #sign-out': 'sign_out'
        },

        sign_out: function(e) {
            e.preventDefault();
            eventBus.trigger('logout-action');
            //TODO: Add logout business logic.
            Backbone.history.navigate('security/login', true);
        }
    });

    module.exports = layoutProfile;
});
