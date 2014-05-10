define(function(require, exports, module) {

    var Backbone = require('backbone');

    var securityFooter = Backbone.View.extend({
        manage: true,
        prefix: 'security/templates/',
        template: 'security-footer.html'
    });

    module.exports = securityFooter;
});
