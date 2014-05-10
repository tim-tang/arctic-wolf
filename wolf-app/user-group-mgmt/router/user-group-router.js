define(function(require, exports, module){

    var Backbone = require('backbone');
    var eventBus = require('../../app-core/index').Eventbus;

	var userGroupRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function() {
            eventBus.trigger('layout:switch-module-action');
        }
    });

    module.exports = userGroupRouter;
});
