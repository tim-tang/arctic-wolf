define(function(require, exports, module) {

	var $ = require('$');
    var Backbone = require('backbone');
    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
	var viewManager = appCore.ViewMgmt;
	require('subroute');

	var roleRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home',
            'view/:roleId': 'viewRole',
            'general-info': 'viewGeneralInfo',
            'privileges': 'viewPrivileges',
            'user-groups': 'viewUserGroups',
            'users': 'viewUsers',
            'history': 'viewHistory'
        },

        home: function() {
            eventBus.trigger('layout:switch-module-action');
        },

        viewRole: function(roleId) {
            require('../role-details-app').run(viewManager, roleId);
        },

		viewGeneralInfo: function() {
            eventBus.trigger('role:render-general-info');
        },

        viewPrivileges: function() {
			eventBus.trigger('role:render-privileges');
        },

        viewUserGroups: function() {
            eventBus.trigger('role:render-user-groups');
        },

        viewUsers: function() {
			eventBus.trigger('role:render-users');
        },

        viewHistory: function() {
			eventBus.trigger('role:render-history');
        }
    });

    module.exports = roleRouter;
});
