define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityFooter = require('./security-footer');

    var forgotPassword = Backbone.View.extend({

        manage: true,
        prefix: 'security/templates/',
        template: 'forgot-password.html',

        events: {
            'submit form': 'send_email'
        },

        initialize: function(){
            this.subviews = [];
        },

        beforeRender: function(){
            $('#main-body').addClass('texture');
        },

        afterRender: function() {
            var layoutFooterView = new securityFooter();
            this.subviews.push(layoutFooterView);
            this.insertView('.middle', layoutFooterView).render();
        },

        send_email: function(e) {
            e.preventDefault();
            //TODO: send email.
            Backbone.history.navigate('security/reset-password', true);
        }

    });

    module.exports = {
        run: function(selector, viewManager) {
            viewManager.show(selector, new forgotPassword());
        }
    };
});
