define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutUser = Backbone.View.extend({
        manage: true,
        prefix: "layout/templates/",
        template: 'layout-user.html'
    });

    module.exports = layoutUser;
});
