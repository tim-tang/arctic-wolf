define(function(require, exports, module){

    var Backbone = require('backbone');
    var roleApp = require('../role-app');
    var eventBus = require('../../app-main/app-eventbus');

	require('subroute');

	var roleRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('switch-view');
            //roleApp.render();
        }
    });

    module.exports = roleRouter;
});
