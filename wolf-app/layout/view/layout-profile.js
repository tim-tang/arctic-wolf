define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutProfile = Backbone.View.extend({
        manage: true,
        template: 'layout/templates/layout-profile.html'
    });

    module.exports = layoutProfile;
});
