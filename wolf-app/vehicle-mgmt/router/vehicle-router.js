define(function(require, exports, module){

    var Backbone = require('backbone');
    require('subroute');
    var vehicleApp = require('../vehicle-app');

    var vehicleRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            this.layoutApp = options.layoutApp;
        },

        routes: {
            '': 'home'
        },

        home: function() {
            this.layoutApp.trigger('switch-view');
        }
    });

    module.exports = vehicleRouter;
});
