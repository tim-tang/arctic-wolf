define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../../common-utils');
    var componentFactory = require('../../generic-component-factory');
    var eventBus = require('app-core').Eventbus;

    var objHistoryViewMixin = {
		
		/*
		 * Parameter 'options' should contain below varibles
		 * - urlRoot: located source on server, ie. - '/role-history',
		 * - model: of which object's history, ie. - new roleModel({'id' : roleId}),
		 * - collection: collection of history, ie. - roleHistoryColl
		 */
		initialize: function(options) {
        	// Remove previous content
        	$('#tab-content').children().remove();
        	// Set values passed from options
        	this.model = options.model;
        	this.model.urlRoot = options.urlRoot;
			this.collection = options.collection;
			// Resigster sync event
        	this.listenTo(this.model, 'sync', this.load_history);
			// Fetch model data
        	this.model.fetch();
        },
       	
		load_history: function() {
			// Prepare collection
			this.collection.set(this.model.get('history')['aaData']);
        	
        	// Load objects into datatable
            var self = this;
            var tab_identify = 'history';
            var datatableOptions = {
                "component_type": "DATATABLE",
                "datatable_id" : this.datatable_id,
                "data" : this.model.get(tab_identify)['aaData'],
                "header" : this.model.get(tab_identify)['aoColumns'],
                "callback" : function(datatable) {
                    self.datatable = datatable;
                    $('#' + self.datatable_id).on('click', 'tbody tr', function(e) {
                        $(this).toggleClass('row_selected');
                    });
                    eventBus.trigger('hide-loading');
                }
            };

            componentFactory.makeComponent(datatableOptions);
       	},
       	
   		afterRender: function() {
   			//TODO:
        }
	};

    module.exports = objHistoryViewMixin;
});
