define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;
    var commonUtils = require('../../common-utils');
    var componentFacade = require('../../component-facade');

    var objMgmtViewMixin = {
        
        initialize: function(options) {
        	this.collection = options.collection;
        	this.view_url = options.view_url;
        	
            this.listenTo(this.collection, 'request', this.show_loading);
            this.listenTo(this.collection, 'remove', this.hide_loading);
            this.listenTo(this.collection, 'sync', this.load_objects);
            
            // Unselect all models
            if(this.collection)
        		this.collection.unselectAll();
        },

        events: {
            'click #mgmt-delete': 'delete_obj',
            'click #mgmt-edit': 'edit_obj',
            'click #mgmt-view': 'view_obj',
            'click #mgmt-new': 'new_obj'
        },
        
        afterRender: function() {
            this.collection.fetch();
        },


		// Load objects into datatable
        load_objects: function() {
            var self = this;
            // Initialze jquery datatable
            componentFacade.init_datatable(this.datatable_id, {
                data: this.collection.toJSON(),
                header: this.collection.columns
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

        view_obj: function(event) {
            if (event) event.preventDefault();
            // Fetch the selected object and navigate to view page
			var selectedModels = this.collection.selected();
			var selectedCount = selectedModels.length;
            if(selectedCount === 0) {
            	alert("Select one object to view!");
            } else if(selectedCount === 1) {
				Backbone.history.navigate(this.view_url + "/" + selectedModels[0].get('id'), true);
			} else {
				alert("Selected more than one object!");
			}
        },

        edit_obj: function(event) {
            if (event) event.preventDefault();
            //TODO:
        },

        delete_obj: function(event) {
            if (event) event.preventDefault();
            // console.log(JSON.stringify(this.collection));
            _.invoke(this.collection.selected(), 'destroy');
            commonUtils.remove_selected_row(this.datatable);
        },

        new_obj: function(event) {
            if (event) event.preventDefault();
			// $('.modal-content').find('input:text, input:password, input:file, select, textarea').val('');
			// $('.modal-content').find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
        }
    };

    module.exports = objMgmtViewMixin;
});
