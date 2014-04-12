define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var layoutFooter = require('../../layout/view/layout-footer');

    var forgotPassword = Backbone.View.extend({

        manage: true,
        template: 'security/templates/forgot-password.html',

        events: {
            'submit form': 'send_email'
        },

        beforeRender: function(){
            $('#main-body').addClass('texture');
        },

        afterRender: function() {
            this.insertView('.middle', new layoutFooter()).render();
        },

        send_email: function() {
            e.preventDefault();
            //TODO: send email.
            Backbone.history.navigate('reset-password', true);
        }

    });

    module.exports = forgotPassword;
});
