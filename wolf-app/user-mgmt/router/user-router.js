define(function(require, exports, module){

    var Backbone = require('backbone');
    var userApp = require('../user-app');

	require('subroute');
	
	var userRouter = Backbone.SubRoute.extend({
    	
    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            userApp.render();
        }
    });

    module.exports = userRouter;
});
