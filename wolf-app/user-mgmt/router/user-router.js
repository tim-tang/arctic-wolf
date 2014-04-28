define(function(require, exports, module){

    var Backbone = require('backbone');
    var userApp = require('../user-app');
    var eventBus = require('../../app-main/app-eventbus');

	require('subroute');

	var userRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('layout:check-layout-action');
            //userApp.render();
        }
    });

    module.exports = userRouter;
});
