define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var appCore = require('app-core');
	var eventBus = appCore.Eventbus;
	var viewManager = appCore.ViewMgmt;

	var appCommon = require('app-common');
	var genericViewFactory = appCommon.GenericViewFactory;

	var userGroupGeneralInfo = require('./view/tab/user-group-general-info');
	
	var userGroupModel = require('./model/user-group-model');
    var userColl = require('app-user-expose').UserColl;
	var userGroupHistoryColl = require('./collection/user-group-history-coll');

	var userGroupDetailsApp = new Backbone.Layout({
		
		manage : true,

		prefix : "user-group-mgmt/src/tpl/",

		template : 'user-group-details-container.html',

		userGroupId : null,
		
		pageMode: 'view',

		initialize : function() {
			eventBus.on('user-group:render-general-info', this.renderGeneralInfo, this);
			eventBus.on('user-group:render-users', this.renderUsers, this);
			eventBus.on('user-group:render-history', this.renderHistory, this);
		},

		events : {
			'click ul.nav-tabs li' : 'active_tab'
		},

		afterRender : function() {
			this.renderGeneralInfo();
		},
				
		// Render General Info View
		renderGeneralInfo : function() {
			console.log("################### in renderGeneralInfo");			
			var userGroupGeneralInfoView = new userGroupGeneralInfo({
				'id' : this.userGroupId,
				'pageMode' : this.pageMode
			});
			this.insertView('#tab-content', userGroupGeneralInfoView).render();
		},

		// Render Assign Users View
		renderUsers : function() {
			var userGroupUserView = genericViewFactory.createView('OBJ_ASSIGN', {
                'identity' : 'users',
                'urlRoot' : '/user-group-users',
                'model' : new userGroupModel({'id' : this.userGroupId}),
                'collection' : userColl,
                'source_collection' : userColl
            });
			this.insertView('#tab-content', userGroupUserView).render();
		},

		// Render User Group History View
		renderHistory : function() {
			var userGroupHistoryView = genericViewFactory.createView('OBJ_HISTORY', {
				'urlRoot' : '/user-group-history',
				'model' : new userGroupModel({'id' : this.userGroupId}),
				'collection' : userGroupHistoryColl
			});

			this.insertView('#tab-content', userGroupHistoryView).render();
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
		run : function(viewManager, userGroupId) {
			userGroupDetailsApp.userGroupId = userGroupId;
			viewManager.show('#main-content', userGroupDetailsApp);
		}
	};
});
