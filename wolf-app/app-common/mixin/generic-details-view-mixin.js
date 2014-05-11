define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../common-utils');
    var componentFacade = require('../component-facade');
    var eventBus = require('app-core').Eventbus;

    var objDetailsViewMixin = {

        initialize: function() {
        	$('#tab-content').children().remove();

        	//this.listenTo(this.model, 'request', this.show_loading);
        	//this.listenTo(this.model, 'remove', this.hide_loading);
        	this.listenTo(this.model, 'sync', this.load_object);

        	this.model.fetch();
        },

        events: {
            'click #delete': 'delete_obj',
            'click #add': 'add_obj'
        },

        init_datatable: function(tab_identify) {
			var self = this;
            // initialze jquery datatable
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

        add_obj: function(event) {
            if (event) event.preventDefault();
            //TODO:
            alert('In Add');
        },

        delete_obj: function(event) {
			if (event) event.preventDefault();
            console.log(JSON.stringify(this.collection));
            _.invoke(this.collection.selected(), 'destroy');
            commonUtils.remove_selected_row(this.datatable);
        }
	};

    module.exports = objDetailsViewMixin;
});
