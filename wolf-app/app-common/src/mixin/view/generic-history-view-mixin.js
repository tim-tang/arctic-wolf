define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../../common-utils');
    var componentFacade = require('../../component-facade');
    var eventBus = require('app-core').Eventbus;

    var objHistoryViewMixin = {

        initialize: function(options) {
        	// Remove previous content
        	$('#tab-content').children().remove();
        	// Set object id
			this.model.set('id', options.id);
			// Resigster sync event
        	this.listenTo(this.model, 'sync', this.load_history);
			// Fetch model data
        	this.model.fetch();
        },

		// Load objects into datatable
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
       	}
	};

    module.exports = objHistoryViewMixin;
});
