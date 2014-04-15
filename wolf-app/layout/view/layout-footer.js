define(function(require, exports, module) {

    var Backbone = require('backbone');

    var layoutFooter = Backbone.View.extend({
        manage: true,
        prefix: 'layout/templates/',
        template: 'layout-footer.html'
    });

    module.exports = layoutFooter;
});
