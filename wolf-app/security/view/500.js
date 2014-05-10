define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var securityFooter = require('./security-footer');

    var internalError = Backbone.View.extend({
        manage: true,
        prefix: 'security/templates/',
        template: '500.html',

        initialize: function(){
            this.subviews = [];
        },

        beforeRender: function() {
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
            viewManager.show(selector, new internalError());
        }
    };
});
