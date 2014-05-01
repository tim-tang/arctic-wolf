define(function(require, exports, module) {

    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');
	var viewManager = require('../../app-main/app-view-manager');

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
        	alert("In route");
            require('../role-details-app').run(viewManager);
        }
    });

    module.exports = roleRouter;
});
