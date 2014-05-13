define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../common-utils');
    var componentFacade = require('../component-facade');
    var eventBus = require('app-core').Eventbus;

    var objDetailsViewMixin = {

        initialize: function(options) {
        	console.log("##################In objDetailsViewMixin initialize()");
        	// Remove previous content
        	$('#tab-content').children().remove();
        	// Set object id
			this.model.set('id', options.id);
			// Resigster sync event
        	this.listenTo(this.model, 'sync', this.load_object);
			// Fetch model data
        	this.model.fetch();
            // Fetch collection data of object for assign page
            this.collection_all.fetch();
        	// This trigger is used to reverse control multi selector data in assign-privilege-modal
            eventBus.off('role:set-selected-objects');
			eventBus.on('role:set-selected-objects', this.setSelectedObjectsForMultiSelect, this);
        },

        events: {
            'click #delete': 'delete_obj',
            'click #add': 'add_obj'
        },

		// Load objects into datatable
        init_datatable: function(tab_identify) {
			var self = this;
			// Initialze jquery datatable
            componentFacade.init_datatable(this.datatable_id, {
                data: this.model.get(tab_identify)['aaData'],
                header: this.model.get(tab_identify)['aoColumns']
            }, function(datatable) {
                self.datatable = datatable;
                $('#' + self.datatable_id).on('click', 'tbody tr', function(e) {
                    $(this).toggleClass('row_selected');
                    var selectedId = $(this).find("td:first").html().trim();
                    var model = self.collection.get(selectedId);
                    model.toggle_select();
                });
                eventBus.trigger('hide-loading');
            });
       	},
       	
		// This trigger method is used to reverse control assign-modal
		setSelectedObjectsForMultiSelect: function(view) {
			console.log("##################In objDetailsViewMixin setSelectedObjectsForMultiSelect()");
			// Prepare selected objects
			var selectedObjectsValue = [];			
			_.each(this.collection.models, function(model) {
				selectedObjectsValue.push(model.id);
			});
			view.assignObjects.selected = selectedObjectsValue;
			// Render multiple select
			view.renderMultiSelect(this.collection_all);
		},

		// Click add link
        add_obj: function(event) {
            if (event) event.preventDefault();
            // Show modal
            $('#assign-object-modal').modal('show');
        },

		// Click delete link
        delete_obj: function(event) {
			if (event) event.preventDefault();
            _.invoke(this.collection.selected(), 'destroy');
            commonUtils.remove_selected_row(this.datatable);
        }
	};

    module.exports = objDetailsViewMixin;
});
