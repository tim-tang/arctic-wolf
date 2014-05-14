 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;

    var userGeneralInfo = require('./view/tab/user-general-info');
    var userUsergroup = require('./view/tab/user-user-group');
    var userHistory = require('./view/tab/user-history');
    
	var userDetailsApp = new Backbone.Layout({

		// el: '#main-content',

        manage: true,

        prefix: "user-mgmt/src/tpl/",

        template: 'user-details-container.html',
        
        userId: null,

        initialize: function() {
        	eventBus.on('user:render-general-info', this.renderGeneralInfo, this);
            eventBus.on('user:render-user-groups', this.renderUserGroups, this);
            eventBus.on('user:render-history', this.renderHistory, this);
		},

	    events: {
             'click ul.nav-tabs li': 'active_tab'
        },

        afterRender: function() {
        	this.renderGeneralInfo();
        },

        renderGeneralInfo: function() {
        	var userGeneralInfoView = new userGeneralInfo({'id': this.userId});
            this.insertView('#tab-content', userGeneralInfoView).render();
        },

        renderUserGroups: function() {
        	var userUsergroupView = new userUsergroup({'id': this.userId});
            this.insertView('#tab-content', userUsergroupView).render();
        },

        renderHistory: function() {
        	var userHistoryView = new userHistory({'id': this.userId});
            this.insertView('#tab-content', userHistoryView).render();
        },

        active_tab: function(event) {
            if (event) event.preventDefault();

            // Updated active menu
            var currentTarget = $(event.target).parent();
            currentTarget.siblings('.active').removeClass('active');
            currentTarget.addClass('active');
        }
    });

	module.exports = {
        run: function(viewManager, userId) {
        	userDetailsApp.userId = userId;
            viewManager.show('#main-content', userDetailsApp);
        }
    };
 });
