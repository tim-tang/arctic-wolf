define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutMenu = Backbone.View.extend({
        manage: true,
        template: 'layout/templates/layout-menu.html'
    });

    module.exports = layoutMenu;

});
