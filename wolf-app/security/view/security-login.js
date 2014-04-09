define(function(require, exports, module) {

    var Backbone = require('backbone');
    var layoutFooter = require('../../layout/view/layout-footer');

    var securityLogin = Backbone.View.extend({
        manage: true,

        template: 'security/templates/security-login.html',

        afterRender: function() {
            this.insertView('.middle-login', new layoutFooter()).render();
        }
    });

    module.exports = securityLogin;
});
