define(function(require, exports, module) {
    var Backbone = require('backbone');
    var layoutFooter = require('../../layout/view/layout-footer');

    var forgotPassword = Backbone.View.extend({

        manage: true,
        template: 'security/templates/forgot-password.html',

        afterRender: function() {
            this.insertView('.middle', new layoutFooter()).render();
        }

    });

    module.exports = forgotPassword;
});
