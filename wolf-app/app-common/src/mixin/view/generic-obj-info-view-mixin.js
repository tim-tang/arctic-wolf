define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../../common-utils');
    var eventBus = require('app-core').Eventbus;

    var objInfoViewMixin = {

        initialize: function(options) {
        	// Remove previous content
        	$('#tab-content').children().remove();
			// Set object id
			this.model.set('id', options.id);
			// Resigster sync event
        	this.listenTo(this.model, 'sync', this.load_object);
			// Fetch model data
        	this.model.fetch();
        },

        events: {
            //'click #delete': 'delete_obj',
            //'click #add': 'add_obj'
        }
	};

    module.exports = objInfoViewMixin;
});
