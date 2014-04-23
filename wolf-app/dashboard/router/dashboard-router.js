define(function(require, exports, module){

    var Backbone = require('backbone');
    require('subroute');
    var eventBus = require('../../app-main/app-eventbus');

    var dashboardRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //this.layoutApp = options.layoutApp;
        },

        routers: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('switch-view');
        }
    });

    module.exports = dashboardRouter;
});
