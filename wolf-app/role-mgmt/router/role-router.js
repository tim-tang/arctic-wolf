define(function(require, exports, module) {

    var Backbone = require('backbone');
    var roleDetailsApp = require('../role-details-app');
    var eventBus = require('../../app-main/app-eventbus');

	require('subroute');

	var roleRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home',
            'view': 'viewRole'
        },

        home: function() {
            eventBus.trigger('layout:check-layout-action');
        },

        viewRole: function() {
        	eventBus.trigger('role:view-role');
        }
    });

    module.exports = roleRouter;
});
