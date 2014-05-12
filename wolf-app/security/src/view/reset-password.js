define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityFooter = require('./security-footer');

    var resetPassword = Backbone.View.extend({

        manage: true,
        prefix: 'security/src/tpl/',
        template: 'reset-password.html',

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
        }
    });

    module.exports = {
        run: function(selector, viewManager) {
            viewManager.show(selector, new resetPassword());
        }
    };
});
