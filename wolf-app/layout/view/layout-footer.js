define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutFooter = Backbone.View.extend({
        manage: true,
        template: 'layout/templates/layout-footer.html'
    });

    module.exports = layoutFooter;
});
