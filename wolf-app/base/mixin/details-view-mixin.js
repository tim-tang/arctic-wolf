define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');
    var eventBus = require('../../app-main/app-eventbus');

    var detailsViewMixin = {

        initialize: function() {
            /*this.listenTo(this.collection, 'request', this.show_loading);
            this.listenTo(this.collection, 'remove', this.hide_loading);
            this.listenTo(this.collection, 'sync', this.load_objects);*/
        },

        events: {
        	/*
            'click #mgmt-delete': 'delete_obj',
            'click #mgmt-edit': 'edit_obj',
            'click #mgmt-view': 'view_obj'*/
        },

        load_object: function() {
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

        edit_obj: function(event) {
            if (event) event.preventDefault();
            //TODO:
        }    };

    module.exports = detailsViewMixin;
});
