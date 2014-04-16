define(function(require, exports, module){

    var Backbone = require('backbone');
    var criteriaApp = require('../criteria-app');

	require('subroute');
	
	var criteriaRouter = Backbone.SubRoute.extend({
    	
    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            criteriaApp.render();
        }
    });

    module.exports = criteriaRouter;
});
