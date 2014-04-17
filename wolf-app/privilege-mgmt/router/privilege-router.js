define(function(require, exports, module){

    var Backbone = require('backbone');
    var privilegeApp = require('../privilege-app');
    var eventBus = require('../../app-main/app-eventbus');

	require('subroute');

	var privilegeRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('switch-view');
            //privilegeApp.render();
        }
    });

    module.exports = privilegeRouter;
});
