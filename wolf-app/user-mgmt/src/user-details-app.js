 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    
    var appCommon = require('app-common');
	var genericViewFactory = appCommon.GenericViewFactory;

    var userGeneralInfo = require('./view/tab/user-general-info');
   	
   	var userModel = require('./model/user-model');
    var userGroupColl = require('app-user-group-expose').UserGroupColl;
	var userHistoryColl = require('./collection/user-history-coll');
    
	var userDetailsApp = new Backbone.Layout({
	    
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
	        var userGeneralInfoView = new userGeneralInfo({
				'id' : this.userId,
				'pageMode' : this.pageMode
			});
			this.insertView('#tab-content', userGeneralInfoView).render();
        },

        renderUserGroups: function() {
        	var userUsergroupView = genericViewFactory.createView('OBJ_ASSIGN', {
                'identity' : 'user_groups',
                'urlRoot' : '/user-user-groups',
                'model' : new userModel({'id' : this.userId}),
                'collection' : userGroupColl,
                'source_collection' : userGroupColl
            });
			this.insertView('#tab-content', userUsergroupView).render();
        },

        renderHistory: function() {
            var userHistoryView = genericViewFactory.createView('OBJ_HISTORY', {
				'urlRoot' : '/user-history',
				'model' : new userModel({'id' : this.userId}),
				'collection' : userHistoryColl
			});

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
