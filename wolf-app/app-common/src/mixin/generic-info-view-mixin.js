define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../common-utils');
    var componentFacade = require('../component-facade');
    var eventBus = require('app-core').Eventbus;

    var objInfoViewMixin = {

        initialize: function() {
        	$('#tab-content').children().remove();

        	this.listenTo(this.model, 'sync', this.load_object);

			// Fetch model data
        	this.model.fetch();
        },

        events: {
            //'click #delete': 'delete_obj',
            //'click #add': 'add_obj'
        },

        add_obj: function(event) {
            if (event) event.preventDefault();
            $('#assign-modal').modal('show');
        },

        delete_obj: function(event) {
			if (event) event.preventDefault();
            _.invoke(this.collection.selected(), 'destroy');
            commonUtils.remove_selected_row(this.datatable);
            console.log(this.collection);
        }
	};

    module.exports = objInfoViewMixin;
});
