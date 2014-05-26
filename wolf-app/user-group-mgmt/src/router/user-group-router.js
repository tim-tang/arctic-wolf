define(function(require, exports, module){

    var Backbone = require('backbone');
    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
	var viewManager = appCore.ViewMgmt;
    require('subroute');

	var userGroupRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home',
            'view/:userGroupId': 'viewUserGroup',
            'general-info': 'viewGeneralInfo',
            'users': 'viewUsers',
            'history': 'viewHistory'
        },

        home: function() {
            eventBus.trigger('layout:switch-module-action');
        },
        
        viewUserGroup: function(userGroupId) {
            require('../user-group-details-app').run(viewManager, userGroupId);
        },

		viewGeneralInfo: function() {
            eventBus.trigger('user-group:render-general-info');
        },
        
        viewUsers: function() {
			eventBus.trigger('user-group:render-users');
        },

        viewHistory: function() {
			eventBus.trigger('user-group:render-history');
        }
    });

    module.exports = userGroupRouter;
});