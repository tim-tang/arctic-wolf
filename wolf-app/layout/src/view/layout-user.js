define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutUser = Backbone.View.extend({
        manage: true,
        prefix: "layout/src/tpl/",
        template: 'layout-user.html'
    });

    module.exports = layoutUser;
});
