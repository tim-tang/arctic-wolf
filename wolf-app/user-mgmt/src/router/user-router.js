define(function(require, exports, module) {

    var Backbone = require('backbone');
    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    require('subroute');

    var userRouter = Backbone.SubRoute.extend({

        initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home',
            'view/:userId': 'viewuser',
            'general-info': 'viewGeneralInfo',
            'user-groups': 'viewUserGroups',
            'history': 'viewHistory'
        },

        home: function() {
            eventBus.trigger('layout:switch-module-action');
        },

        viewuser: function(userId) {
            require('../user-details-app').run(viewManager, userId);
        },

        viewGeneralInfo: function() {
            eventBus.trigger('user:render-general-info');
        },

        viewUserGroups: function() {
            eventBus.trigger('user:render-user-groups');
        },

        viewHistory: function() {
            eventBus.trigger('user:render-history');
        }
    });

    module.exports = userRouter;
});
