define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutLogo = Backbone.View.extend({
        manage: true,
        template: 'layout/templates/layout-logo.html'
    });

    module.exports = layoutLogo;
});
