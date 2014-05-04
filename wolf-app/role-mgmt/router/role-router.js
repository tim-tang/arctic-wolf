define(function(require, exports, module) {

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

        viewPrivileges: function() {
            //TODO: switch to privileges view.
            alert('Switch privilge view...');
        },

        viewUserGroups: function(){
            //TODO: switch to user groups view.
            alert('Switch user groups view...');
        },

        viewUsers: function() {
            //TODO: switch to users view.
            alert('Switch users view...');
        },

        viewHistory: function() {
            //TODO: switch to history view.
            alert('Switch history view...');
        }
    });

    module.exports = roleRouter;
});
