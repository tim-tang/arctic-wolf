define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutLogo = Backbone.View.extend({
        manage: true,
        prefix: 'layout/templates/',
        template: 'layout-logo.html'
    });

    module.exports = layoutLogo;
});
