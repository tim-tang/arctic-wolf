define(function(require, exports, module){

    var Backbone = require('backbone');
    var userGroupApp = require('../user-group-app');
    var eventBus = require('../../app-main/app-eventbus');

	require('subroute');

	var userGroupRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('switch-view');
            //userGroupApp.render();
        }
    });

    module.exports = userGroupRouter;
});
