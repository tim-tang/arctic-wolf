define(function(require, exports, module) {

    var Backbone = require('backbone');
    var layoutApp = require('../../layout/layout-app');
    var layoutFooter = require('../../layout/view/layout-footer');

    var securityLogin = Backbone.View.extend({
        manage: true,

        template: 'security/templates/security-login.html',

        afterRender: function() {
            this.insertView('.middle-login', new layoutFooter()).render();
        },

        events:{
            "click #login": "loginBtnClick"
        },

        loginBtnClick: function() {
            console.log("Click login button!");
            layoutApp.render();
        }
    });

    module.exports = securityLogin;
});
