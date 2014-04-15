define(function(require, exports, module){

    var Backbone = require('backbone');
    var userGroupApp = require('../user-group-app');

	require('subroute');
	
	var userGroupRouter = Backbone.SubRoute.extend({
    	
    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            userGroupApp.render();
        }
    });

    module.exports = userGroupRouter;
});
