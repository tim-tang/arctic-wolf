define(function(require, exports, module){

    var Backbone = require('backbone');
    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    require('subroute');

	var criteriaRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home',
            'view/:criteriaId': 'viewcriteria',
            'general-info': 'viewGeneralInfo',
            'criteria-privileges': 'viewWhereUsed',
            'history': 'viewHistory'
        },

        home: function() {
            eventBus.trigger('layout:switch-module-action');
        },

        viewcriteria: function(criteriaId) {
            require('../criteria-details-app').run(viewManager, criteriaId);
        },

        viewGeneralInfo: function() {
            eventBus.trigger('criteria:render-general-info');
        },

        viewWhereUsed: function() {
            eventBus.trigger('criteria:render-where-used');
        },

        viewHistory: function() {
            eventBus.trigger('criteria:render-history');
        }
    });

    module.exports = criteriaRouter;
});
