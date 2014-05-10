define(function(require, exports, module) {

    var Backbone = require('backbone');
    var eventBus = require('../../app-core/index').Eventbus;

    var dashboardRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //this.layoutApp = options.layoutApp;
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('layout:switch-module-action');
        }
    });

    module.exports = dashboardRouter;
});
