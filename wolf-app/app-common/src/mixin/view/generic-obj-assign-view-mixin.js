define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var eventBus = require('app-core').Eventbus;
    var commonUtils = require('../../common-utils');
    var componentFactory = require('../../generic-component-factory');
    var assignObjModal = require('../../view/subview/obj-assign-modal');

    var objAssignViewMixin = {
		/*
		 * Parameter 'options' should contain below varibles
		 * - identity: indicator to assign which object, ie. - 'privileges',
		 * - model: object which have assigned other objects ie. - new objModel({'id' : roleId}),
		 * - collection: collection of assigned objects, ie. - privilegeColl
		 * - source_collection: collection of all objects which can be assigned, ie. - privilegeColl
		 */
        initialize: function(options) {
        	console.log("##################In objDetailsViewMixin initialize()");
        	// Remove previous content
        	$('#tab-content').children().remove();
        	// Set values passed from options
        	this.identity = options.identity;
            this.model = options.model;
            this.model.urlRoot = options.urlRoot;
            this.collection = options.collection;
            this.source_collection = options.source_collection;
			// Resigster sync event
        	this.listenTo(this.model, 'sync', this.load_object);
			// Fetch model data
        	this.model.fetch();
            // Fetch collection data of object for assign page
            this.source_collection.fetch();
        	// This trigger is used to reverse control multi selector data in assign-privilege-modal
            eventBus.off('role:set-selected-objects');
			eventBus.on('role:set-selected-objects', this.setSelectedObjectsForMultiSelect, this);
        },

        events: {
            'click #delete': 'delete_obj',
            'click #add': 'add_obj'
        },
    
        load_object: function() {
            console.log("##################In objDetailsViewMixin load_object()");
            // Prepare collection
            this.collection.set(this.model.get(this.identity)['aaData']);
            
            // Load objects into datatable
            var self = this;
            var datatableOptions = {
                "component_type": "DATATABLE",
                "datatable_id" : this.datatable_id,
                "data" : this.model.get(this.identity)['aaData'],
                "header" : this.model.get(this.identity)['aoColumns'],
                "callback" : function(datatable) {
                    self.datatable = datatable;
                    $('#' + self.datatable_id).on('click', 'tbody tr', function(e) {
                        $(this).toggleClass('row_selected');
                    });
                    eventBus.trigger('hide-loading');
                }
            };
            componentFactory.makeComponent(datatableOptions);
            
            // Insert Assign Privilege Modal
            this.insertView(new assignObjModal()).render();
        },

        afterRender: function() {
            //TODO:
        },
       	
		// This trigger method is used to reverse control assign-modal
		setSelectedObjectsForMultiSelect: function(view) {
			console.log("##################In objDetailsViewMixin setSelectedObjectsForMultiSelect()");
			// Prepare selected objects
			var selectedObjectsValue = [];			
			_.each(this.collection.models, function(model) {
				selectedObjectsValue.push(model.id);
			});
			// TODO: Need refactor
			if(this.identity === 'privileges')
                view.assignObjects[0].selected = selectedObjectsValue;
            if(this.identity === 'user_groups')
                view.assignObjects[1].selected = selectedObjectsValue;
            if(this.identity === 'users')
				view.assignObjects[2].selected = selectedObjectsValue;
		    if(this.identity === 'roles')
                view.assignObjects[3].selected = selectedObjectsValue;
			// Render multiple select
			view.renderMultiSelect(this.identity, this.source_collection);
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

    module.exports = objAssignViewMixin;
});
