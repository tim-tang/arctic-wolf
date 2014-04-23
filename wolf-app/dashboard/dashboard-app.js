define(function(require, exports, module) {

    var Backbone = require('backbone');
    var viewManager = require('../app-main/app-view-manager');
    var eventBus = require('../app-main/app-eventbus');

    var dashboardApp = new Backbone.Layout({

        manage: true,
        keep: true,
        prefix: 'dashboard/templates/',
        template: 'dashboard.html',


        initialize: function() {
            this.subviews = [];
        },


        afterRender: function() {
            //TODO:
        }

    });

    module.exports = {
        run: function(viewManager) {
            viewManager.show('#main-content', dashboardApp);
        }
    };
});
