define(function(require, exports, module) {

    var Backbone = require('backbone');
    require('subroute');
    var eventBus = require('../../app-main/app-eventbus');

    var dashboardRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //this.layoutApp = options.layoutApp;
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('layout:check-layout-action');
        }
    });

    module.exports = dashboardRouter;
});
