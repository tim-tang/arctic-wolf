define(function(require, exports, module) {

    var Backbone = require('backbone');
    var layoutApp = require('../../layout/layout-app');
    var layoutFooter = require('../../layout/view/layout-footer');

    var securityLogin = Backbone.View.extend({

        manage: true,

        prefix: 'security/templates/',
        template: 'security-login.html',

        afterRender: function() {
            this.insertView('.middle-login', new layoutFooter()).render();
        },

        events: {
            'submit form': 'authenticate'
        },

        authenticate: function(e) {
            e.preventDefault();

            //this.collection.create({
            //    username: this.$('input[id=username]').val(),
            //    password: this.$('input[id=password]').val()
            //});
            Backbone.history.navigate('dashboard', true);
        }
    });

    module.exports = securityLogin;
});
