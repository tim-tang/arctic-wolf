define(function(require, exports, module) {

    var Backbone = require('backbone');
    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    require('subroute');

    var privilegeRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home',
            'view/:privilegeId': 'viewPrivilege',
            'general-info': 'viewGeneralInfo',
            'privilege-roles': 'viewWhereUsed',
            'history': 'viewHistory'
        },

        home: function() {
            eventBus.trigger('layout:switch-module-action');
        },

        viewPrivilege: function(privilegeId) {
            require('../privilege-details-app').run(viewManager, privilegeId);
        },

        viewGeneralInfo: function() {
            eventBus.trigger('privilege:render-general-info');
        },

        viewWhereUsed: function() {
            eventBus.trigger('privilege:render-where-used');
        },

        viewHistory: function() {
            eventBus.trigger('privilege:render-history');
        }
    });

    module.exports = privilegeRouter;
});
