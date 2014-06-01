define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var appCore = require('app-core');
	var eventBus = appCore.Eventbus;
	var viewManager = appCore.ViewMgmt;

	var appCommon = require('app-common');
	var genericViewFactory = appCommon.GenericViewFactory;

	var roleGeneralInfo = require('./view/tab/role-general-info');
	
	var roleModel = require('./model/role-model');
	var privilegeColl = require('app-privilege-mgmt-expose').PrivilegeColl;
    var userGroupColl = require('app-user-group-mgmt-expose').UserGroupColl;
    var userColl = require('app-user-mgmt-expose').UserColl;
	var roleHistoryColl = require('./collection/role-history-coll');

	var roleDetailsApp = new Backbone.Layout({
		
		manage : true,

		prefix : "role-mgmt/src/tpl/",

		template : 'role-details-container.html',

		roleId : null,
		
		pageMode: 'view',

		initialize : function() {
			eventBus.on('role:render-general-info', this.renderGeneralInfo, this);
			eventBus.on('role:render-privileges', this.renderPrivileges, this);
			eventBus.on('role:render-user-groups', this.renderUserGroups, this);
			eventBus.on('role:render-users', this.renderUsers, this);
			eventBus.on('role:render-history', this.renderHistory, this);
		},

		events : {
			'click ul.nav-tabs li' : 'active_tab'
		},

		afterRender : function() {
			this.renderGeneralInfo();
		},
		
		// Render General Info View
		renderGeneralInfo : function() {
			var roleGeneralInfoView = new roleGeneralInfo({
				'id' : this.roleId,
				'pageMode' : this.pageMode
			});
			this.insertView('#tab-content', roleGeneralInfoView).render();
		},

		// Render Assign Privilege View
		renderPrivileges : function() {
            var rolePrivilegeView = genericViewFactory.createView('OBJ_ASSIGN', {
                'identity' : 'privileges',
                'urlRoot' : '/role-privileges',
                'model' : new roleModel({'id' : this.roleId}),
                'collection' : privilegeColl,
                'source_collection' : privilegeColl
            });
			this.insertView('#tab-content', rolePrivilegeView).render();
		},

		// Render Assign User Group View
		renderUserGroups : function() {
		    var roleUsergroupView = genericViewFactory.createView('OBJ_ASSIGN', {
                'identity' : 'user_groups',
                'urlRoot' : '/role-user-groups',
                'model' : new roleModel({'id' : this.roleId}),
                'collection' : userGroupColl,
                'source_collection' : userGroupColl
            });
			this.insertView('#tab-content', roleUsergroupView).render();
		},

		// Render Assign Users View
		renderUsers : function() {
			var roleUserView = genericViewFactory.createView('OBJ_ASSIGN', {
                'identity' : 'users',
                'urlRoot' : '/role-users',
                'model' : new roleModel({'id' : this.roleId}),
                'collection' : userColl,
                'source_collection' : userColl
            });
			this.insertView('#tab-content', roleUserView).render();
		},

		// Render Role History View
		renderHistory : function() {
			var roleHistoryView = genericViewFactory.createView('OBJ_HISTORY', {
				'urlRoot' : '/role-history',
				'model' : new roleModel({'id' : this.roleId}),
				'collection' : roleHistoryColl
			});

			this.insertView('#tab-content', roleHistoryView).render();
		},

		active_tab : function(event) {
			if (event)
				event.preventDefault();
			// Updated active menu
			var currentTarget = $(event.target).parent();
			currentTarget.siblings('.active').removeClass('active');
			currentTarget.addClass('active');
		}
	});

	module.exports = {
		run : function(viewManager, roleId) {
			roleDetailsApp.roleId = roleId;
			viewManager.show('#main-content', roleDetailsApp);
		}
	};
});
