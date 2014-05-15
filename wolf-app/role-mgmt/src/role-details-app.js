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
	var rolePrivilege = require('./view/tab/role-privilege');
	var roleUser = require('./view/tab/role-user');
	var roleUsergroup = require('./view/tab/role-user-group');

	var roleModel = require('./model/role-model');
	var roleHistoryColl = require('./collection/role-history-coll');

	var roleDetailsApp = new Backbone.Layout({
		
		manage : true,

		prefix : "role-mgmt/src/tpl/",

		template : 'role-details-container.html',

		roleId : null,

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

		renderGeneralInfo : function() {
			var roleGeneralInfoView = new roleGeneralInfo({
				'id' : this.roleId
			});
			this.insertView('#tab-content', roleGeneralInfoView).render();
		},

		renderPrivileges : function() {
			var rolePrivilegeView = new rolePrivilege({
				'id' : this.roleId
			});
			this.insertView('#tab-content', rolePrivilegeView).render();
		},

		renderUserGroups : function() {
			var roleUsergroupView = new roleUsergroup({
				'id' : this.roleId
			});
			this.insertView('#tab-content', roleUsergroupView).render();
		},

		renderUsers : function() {
			var roleUserView = new roleUser({
				'id' : this.roleId
			});
			this.insertView('#tab-content', roleUserView).render();
		},

		renderHistory : function() {
			var _model = new roleModel();
			_model.set({
				'id' : this.roleId
			});
			var roleHistoryView = genericViewFactory.createView('OBJ_HISTORY', {
				'urlRoot' : '/role-history',
				'model' : _model,
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
