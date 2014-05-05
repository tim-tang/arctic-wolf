define(function(require, exports, module){

    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');

	var criteriaRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('layout:check-layout-action');
        }
    });

    module.exports = criteriaRouter;
});
