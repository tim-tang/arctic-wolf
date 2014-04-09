define(function(require, exports, module) {
    var Backbone = require('backbone');
    var layoutFooter = require('../../layout/view/layout-footer');

    var resetPassword = Backbone.View.extend({

        manage: true,
        template: 'security/templates/reset-password.html',

        afterRender: function() {
            this.insertView('.middle', new layoutFooter()).render();
        }

    });

    module.exports = resetPassword;
});
