define(function(require, exports, module) {

    var Backbone = require('backbone');
    var layoutApp = require('../../layout/layout-app');
    var layoutFooter = require('../../layout/view/layout-footer');

    var securityLogin = Backbone.View.extend({

        manage: true,
        prefix: 'security/templates/',
        template: 'security-login.html',

        initialize: function(){
            this.subviews = [];
        },

        afterRender: function() {
            var layoutFooterView = new layoutFooter();
            this.subviews.push(layoutFooterView);
            this.insertView('.middle-login', layoutFooterView).render();
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
            Backbone.history.navigate('#dashboard/', true);
        }
    });

    module.exports = {
        run: function(selector, viewManager) {
            viewManager.show(selector, new securityLogin());
        }
    };
});
