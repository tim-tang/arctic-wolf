define(function(require, exports, module){

    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');
    require('subroute');

    var genericFilterRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home'
        },

        home: function(){
            eventBus.trigger('switch-view');
        }
    });

    module.exports = genericFilterRouter;
});