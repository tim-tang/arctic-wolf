define(function(require, exports, module) {
    var Backbone = require('backbone');

    var dashboard = Backbone.View.extend({

        manage: true,

        template: 'dashboard/src/tpl/dashboard.html',

        afterRender: function(){
            //this.insertViews('#layout-logo-user-menu', []);
        }

    });

    module.exports = dashboard;
});
