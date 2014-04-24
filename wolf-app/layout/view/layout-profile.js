define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutProfile = Backbone.View.extend({
        manage: true,
        prefix: "layout/templates/",
        template: 'layout-profile.html',

        events: {
            'click #sign-out': 'sign_out'
        },

        sign_out: function(e) {
            e.preventDefault();
            //TODO: remove layout view while user logout.
            Backbone.history.navigate('security/login', true);
        }
    });

    module.exports = layoutProfile;
});
