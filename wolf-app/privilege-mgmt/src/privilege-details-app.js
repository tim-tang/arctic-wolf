 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    
    var appCommon = require('app-common');
	var genericViewFactory = appCommon.GenericViewFactory;

    var privilegeGeneralInfo = require('./view/tab/privilege-general-info');
   	
   	var privilegeModel = require('./model/privilege-model');
    var roleColl = require('app-role-expose').RoleColl;
	var privilegeHistoryColl = require('./collection/privilege-history-coll');
    
	var privilegeDetailsApp = new Backbone.Layout({

        manage: true,

        prefix: "privilege-mgmt/src/tpl/",

        template: 'privilege-details-container.html',
        
        privilegeId: null,

        initialize: function() {
        	eventBus.on('privilege:render-general-info', this.renderGeneralInfo, this);
            eventBus.on('privilege:render-where-used', this.renderWhereUsed, this);
            eventBus.on('privilege:render-history', this.renderHistory, this);
		},

	    events: {
             'click ul.nav-tabs li': 'active_tab'
        },

        afterRender: function() {
        	this.renderGeneralInfo();
        },

        renderGeneralInfo: function() {
	        var privilegeGeneralInfoView = new privilegeGeneralInfo({
				'id' : this.privilegeId,
				'pageMode' : this.pageMode
			});
			this.insertView('#tab-content', privilegeGeneralInfoView).render();
        },

        renderWhereUsed: function() {
        	var privilegeWhereUsedView = genericViewFactory.createView('OBJ_ASSIGN', {
                'identity' : 'roles',
                'urlRoot' : '/privilege-roles',
                'model' : new privilegeModel({'id' : this.privilegeId}),
                'collection' : roleColl,
                'source_collection' : roleColl
            });
			this.insertView('#tab-content', privilegeWhereUsedView).render();
        },

        renderHistory: function() {
            var privilegeHistoryView = genericViewFactory.createView('OBJ_HISTORY', {
				'urlRoot' : '/privilege-history',
				'model' : new privilegeModel({'id' : this.privilegeId}),
				'collection' : privilegeHistoryColl
			});

			this.insertView('#tab-content', privilegeHistoryView).render();
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
        run: function(viewManager, privilegeId) {
        	privilegeDetailsApp.privilegeId = privilegeId;
            viewManager.show('#main-content', privilegeDetailsApp);
        }
    };
 });
