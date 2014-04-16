define(function(require, exports, module){

    var Backbone = require('backbone');
    var roleApp = require('../role-app');

	require('subroute');
	
	var roleRouter = Backbone.SubRoute.extend({
    	
    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            roleApp.render();
        }
    });

    module.exports = roleRouter;
});
