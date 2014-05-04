define(function(require, exports, module) {

	var $ = require('$');
    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');
	var viewManager = require('../../app-main/app-view-manager');

	require('subroute');

	var roleRouter = Backbone.SubRoute.extend({

    	initialize: function(options) {
            //TODO:
        },

        routes: {
            '': 'home',
            'view': 'viewRole',
            'general-info': 'viewGeneralInfo',
            'privileges': 'viewPrivileges',
            'user-groups': 'viewUserGroups',
            'users': 'viewUsers',
            'history': 'viewHistory'
        },

        home: function() {
            eventBus.trigger('layout:check-layout-action');
        },
        
        viewRole: function() {
            require('../role-details-app').run(viewManager);
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
