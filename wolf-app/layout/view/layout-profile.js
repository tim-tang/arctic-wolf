define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutProfile = Backbone.View.extend({
        manage: true,
        prefix: "layout/templates/",
        template: 'layout-profile.html'
    });

    module.exports = layoutProfile;
});
