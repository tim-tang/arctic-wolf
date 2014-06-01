 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    
    var appCommon = require('app-common');
	var genericViewFactory = appCommon.GenericViewFactory;

    var criteriaGeneralInfo = require('./view/tab/criteria-general-info');
   	
   	var criteriaModel = require('./model/criteria-model');
    var privilegeColl = require('app-privilege-mgmt-expose').PrivilegeColl;
	var criteriaHistoryColl = require('./collection/criteria-history-coll');
    
	var criteriaDetailsApp = new Backbone.Layout({

        manage: true,

        prefix: "criteria-mgmt/src/tpl/",

        template: 'criteria-details-container.html',
        
        criteriaId: null,

        initialize: function() {
        	eventBus.on('criteria:render-general-info', this.renderGeneralInfo, this);
            eventBus.on('criteria:render-where-used', this.renderWhereUsed, this);
            eventBus.on('criteria:render-history', this.renderHistory, this);
		},

	    events: {
             'click ul.nav-tabs li': 'active_tab'
        },

        afterRender: function() {
        	this.renderGeneralInfo();
        },

        renderGeneralInfo: function() {
	        var criteriaGeneralInfoView = new criteriaGeneralInfo({
				'id' : this.criteriaId,
				'pageMode' : this.pageMode
			});
			this.insertView('#tab-content', criteriaGeneralInfoView).render();
        },

        renderWhereUsed: function() {
        	var criteriaWhereUsedView = genericViewFactory.createView('OBJ_ASSIGN', {
                'identity' : 'privileges',
                'urlRoot' : '/criteria-privileges',
                'model' : new criteriaModel({'id' : this.criteriaId}),
                'collection' : privilegeColl,
                'source_collection' : privilegeColl
            });
			this.insertView('#tab-content', criteriaWhereUsedView).render();
        },

        renderHistory: function() {
            var criteriaHistoryView = genericViewFactory.createView('OBJ_HISTORY', {
				'urlRoot' : '/criteria-history',
				'model' : new criteriaModel({'id' : this.criteriaId}),
				'collection' : criteriaHistoryColl
			});

			this.insertView('#tab-content', criteriaHistoryView).render();
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
        run: function(viewManager, criteriaId) {
        	criteriaDetailsApp.criteriaId = criteriaId;
            viewManager.show('#main-content', criteriaDetailsApp);
        }
    };
 });
