define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;
    var commonUtils = require('../../common-utils');
    var componentFactory = require('../../generic-component-factory');

    var objMgmtViewMixin = {

        /*
         * Parameter 'options' should contain below varibles
         * - view_url: url of view specific object, ie. - 'role-mgmt/view',
         * - collection: collection of mgmt object, ie. - roleColl
         */
        initialize : function(options) {
            this.view_url = options.view_url;
            this.collection = options.collection;

            this.listenTo(this.collection, 'request', this.show_loading);
            this.listenTo(this.collection, 'remove', this.hide_loading);
            this.listenTo(this.collection, 'sync', this.load_objects);

            // Unselect all models
            if (this.collection)
                this.collection.unselectAll();
        },

        events : {
            'click #mgmt-delete' : 'delete_obj',
            'click #mgmt-edit' : 'edit_obj',
            'click #mgmt-view' : 'view_obj',
            'click #mgmt-new' : 'new_obj'
        },

        afterRender : function() {
            this.collection.fetch();
        },

        // Load objects into datatable
        load_objects : function() {
            var self = this;
            var datatableOptions = {
                "component_type": "DATATABLE",
                "datatable_id" : this.datatable_id,
                "data" : this.collection.toJSON(),
                "header" : this.collection.columns,
                "callback" : function(datatable) {
                    self.datatable = datatable;
                    $('#' + self.datatable_id).on('click', 'tbody tr', function(e) {
                        $(this).toggleClass('row_selected');
                        var selectedId = $(this).find("td:first").html().trim();
                        var model = self.collection.get(selectedId);
                        model.toggle_select();
                    });
                    eventBus.trigger('hide-loading');
                }
            };

            componentFactory.makeComponent(datatableOptions);
        },

        view_obj : function(event) {
            if (event)
                event.preventDefault();
            // Fetch the selected object and navigate to view page
            var selectedModels = this.collection.selected();
            var selectedCount = selectedModels.length;
            if (selectedCount === 0) {
			    commonUtils.pop_msg('mgmt-msg', 'Select one object to view!', commonUtils.MSG_ALERT);
            } else if (selectedCount === 1) {
                Backbone.history.navigate(this.view_url + "/" + selectedModels[0].get('id'), true);
            } else {
				commonUtils.pop_msg('mgmt-msg', 'Selected more than one object!', commonUtils.MSG_ALERT);
            }
        },

        edit_obj : function(event) {
            if (event)
                event.preventDefault();
            //TODO:
        },

        delete_obj : function(event) {
            if (event)
                event.preventDefault();
            // console.log(JSON.stringify(this.collection));
            _.invoke(this.collection.selected(), 'destroy');
            commonUtils.remove_selected_row(this.datatable);
        },

        new_obj : function(event) {
            if (event) event.preventDefault();
            // Show modal
            $('#new-modal').modal('show');
        }
    };

    module.exports = objMgmtViewMixin;
});
