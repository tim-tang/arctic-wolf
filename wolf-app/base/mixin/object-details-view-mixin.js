define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');
    var eventBus = require('../../app-main/app-eventbus');

    var objDetailsViewMixin = {

        initialize: function() {
        	$('#tab-content').children().remove();
        	
        	//this.listenTo(this.model, 'request', this.show_loading);
        	//this.listenTo(this.model, 'remove', this.hide_loading);
        	this.listenTo(this.model, 'sync', this.load_object);
        	
        	this.model.fetch();
        },

        events: {
            'click #mgmt-edit': 'edit_obj',
            'click #mgmt-view': 'view_obj'
        },

        load_object: function() {
            console.log(this.model.toJSON());
        },

        edit_obj: function(event) {
            if (event) event.preventDefault();
            //TODO:
        }
	};

    module.exports = objDetailsViewMixin;
});
