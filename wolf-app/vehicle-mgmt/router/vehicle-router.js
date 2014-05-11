define(function(require, exports, module) {

    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;
    require('subroute');

    var vehicleRouter = Backbone.SubRoute.extend({

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

    module.exports = vehicleRouter;
});
