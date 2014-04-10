define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutUser = Backbone.View.extend({
        manage: true,
        template: 'layout/templates/layout-user.html'
    });

    module.exports = layoutUser;
});
