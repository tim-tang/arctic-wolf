 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var appCore = require('app-core');
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    
    var appCommon = require('app-common');
	var genericViewFactory = appCommon.GenericViewFactory;

    var vehicleGeneralInfo = require('./view/tab/vehicle-general-info');
   	
   	var vehicleModel = require('./model/vehicle-model');
	var vehicleHistoryColl = require('./collection/vehicle-history-coll');
    
	var vehicleDetailsApp = new Backbone.Layout({
	    
        manage: true,

        prefix: "vehicle-mgmt/src/tpl/",

        template: 'vehicle-details-container.html',
        
        vehicleId: null,

        initialize: function() {
        	eventBus.on('vehicle:render-general-info', this.renderGeneralInfo, this);
            eventBus.on('vehicle:render-history', this.renderHistory, this);
		},

	    events: {
             'click ul.nav-tabs li': 'active_tab'
        },

        afterRender: function() {
        	this.renderGeneralInfo();
        },

        renderGeneralInfo: function() {
	        var vehicleGeneralInfoView = new vehicleGeneralInfo({
				'id' : this.vehicleId,
				'pageMode' : this.pageMode
			});
			this.insertView('#tab-content', vehicleGeneralInfoView).render();
        },

        renderHistory: function() {
            var vehicleHistoryView = genericViewFactory.createView('OBJ_HISTORY', {
				'urlRoot' : '/vehicle-history',
				'model' : new vehicleModel({'id' : this.vehicleId}),
				'collection' : vehicleHistoryColl
			});

			this.insertView('#tab-content', vehicleHistoryView).render();
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
        run: function(viewManager, vehicleId) {
        	vehicleDetailsApp.vehicleId = vehicleId;
            viewManager.show('#main-content', vehicleDetailsApp);
        }
    };
 });
