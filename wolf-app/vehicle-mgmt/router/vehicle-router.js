define(function(require, exports, module){

    var Backbone = require('backbone');
    require('subroute');
    var vehicleApp = require('../vehicle-app');

    var vehicleRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            vehicleApp.render();
        }
    });

    module.exports = vehicleRouter;
});
