define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');
    var eventBus = require('../../app-main/app-eventbus');

    var detailsViewMixin = {

        initialize: function() {
        	this.listenTo(this.model, 'request', this.show_loading);
        	this.listenTo(this.model, 'sync', this.load_object);
            /*this.listenTo(this.collection, 'request', this.show_loading);
            this.listenTo(this.collection, 'remove', this.hide_loading);
            this.listenTo(this.collection, 'sync', this.load_objects);*/
        },

        events: {
            'click #mgmt-edit': 'edit_obj',
            'click #mgmt-view': 'view_obj'
        },

        load_object: function() {

        },

        edit_obj: function(event) {
            if (event) event.preventDefault();
            //TODO:
        }
	};

    module.exports = detailsViewMixin;
});
