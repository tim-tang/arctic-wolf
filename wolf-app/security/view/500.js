define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var layoutFooter = require('../../layout/view/layout-footer');

    var internalError = Backbone.View.extend({
        manage: true,
        template: 'security/templates/500.html',

        beforeRender: function() {
            $('#main-body').addClass('texture');
        },

        afterRender: function() {
            this.insertView('.middle', new layoutFooter()).render();
        }

    });

    module.exports = internalError;
});
