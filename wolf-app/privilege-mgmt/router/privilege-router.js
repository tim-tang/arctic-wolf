define(function(require, exports, module){

    var Backbone = require('backbone');
    var privilegeApp = require('../privilege-app');

	require('subroute');
	
	var privilegeRouter = Backbone.SubRoute.extend({
    	
    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            privilegeApp.render();
        }
    });

    module.exports = privilegeRouter;
});
