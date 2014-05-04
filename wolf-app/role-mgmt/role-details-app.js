 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var eventBus = require('../app-main/app-eventbus');
    var viewManager = require('../app-main/app-view-manager');

    var roleGeneralInfo = require('./view/tab/role-general-info');
	var rolePrivilege = require('./view/tab/role-privilege');
    var roleUser = require('./view/tab/role-user');
    var roleUsergroup = require('./view/tab/role-user-group');
    var roleHistory = require('./view/tab/role-history');

	var roleDetailsApp = new Backbone.Layout({

		// el: '#main-content',

        manage: true,

        prefix: "role-mgmt/templates/",

        template: 'role-details-container.html',

        initialize: function() {
        	eventBus.on('role:render-general-info', this.renderGeneralInfo, this);
            eventBus.on('role:render-privileges', this.renderPrivileges, this);
            eventBus.on('role:render-user-groups', this.renderUserGroups, this);
            eventBus.on('role:render-users', this.renderUsers, this);
            eventBus.on('role:render-history', this.renderHistory, this);
		},

	    events: {
             'click ul.nav-tabs li': 'active_tab'
        },

        afterRender: function() {
        	this.renderGeneralInfo();
        },
        
        renderGeneralInfo: function() {
        	var roleGeneralInfoView = new roleGeneralInfo();
            this.insertView('#tab-content', roleGeneralInfoView).render();
        },
        
        renderPrivileges: function() {
        	var rolePrivilegeView = new rolePrivilege();
            this.insertView('#tab-content', rolePrivilegeView).render();
        },
        
        renderUserGroups: function() {
        	var roleUsergroupView = new roleUsergroup();
            this.insertView('#tab-content', roleUsergroupView).render();
        },
        
        renderUsers: function() {
        	var roleUserView = new roleUser();
            this.insertView('#tab-content', roleUserView).render();
        },
        
        renderHistory: function() {
        	var roleHistoryView = new roleHistory();
            this.insertView('#tab-content', roleHistoryView).render();
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
        run: function(viewManager) {
            viewManager.show('#main-content', roleDetailsApp);
        }
    };
 });
