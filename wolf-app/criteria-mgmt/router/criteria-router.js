define(function(require, exports, module){

    var Backbone = require('backbone');
    var criteriaApp = require('../criteria-app');
    var eventBus = require('../../app-main/app-eventbus');
	require('subroute');

	var criteriaRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('layout:check-layout-action');
            //criteriaApp.render();
        }
    });

    module.exports = criteriaRouter;
});
