define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');
    var eventBus = require('../../app-main/app-eventbus');

    var objMgmtViewMixin = {

        initialize: function() {
            this.listenTo(this.collection, 'request', this.show_loading);
            this.listenTo(this.collection, 'remove', this.hide_loading);
            this.listenTo(this.collection, 'sync', this.load_objects);
        },

        events: {
            'click #mgmt-delete': 'delete_obj',
            'click #mgmt-edit': 'edit_obj',
            'click #mgmt-view': 'view_obj',
            'click #mgmt-new': 'new_obj'
        },

        load_objects: function() {
            var self = this;
            // initialze jquery datatable
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
            alert("mgmtViewMixin");
            //TODO:
        },

        edit_obj: function(event) {
            if (event) event.preventDefault();
            //TODO:
        },

        delete_obj: function(event) {
            if (event) event.preventDefault();
            console.log(JSON.stringify(this.collection));
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
