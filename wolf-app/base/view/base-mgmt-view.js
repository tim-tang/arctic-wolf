define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');

    var BaseView = require('./base-view');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var baseMgmtView = BaseView.extend({

        prefix: '',

        template: '',

		datatable_id: '',

    	datatable: null,

    	collection: null,

    	events: {
            'click #mgmt-delete': 'delete_obj',
            'click #mgmt-edit': 'edit_obj',
            'click #mgmt-view': 'view_obj'
        },

    	load_objects: function(mgmtView) {
    		self = this;
	        self.collection = mgmtView.collection;

			// Inital Datatable
            componentFacade.init_datatable(this.datatable_id, {data: mgmtView.collection.toJSON(), header: mgmtView.collection.columns}, function(datatable) {
	            self.datatable = datatable;
	            $(this.datatable_id).on('click', 'tbody tr', function(e) {
	                $(mgmtView).toggleClass('row_selected');
	                var selected_id = $(mgmtView).find("td:first").html().trim();
	                var model = this.collection.get(selected_id);
	                model.toggle_select();
	            });
	            eventBus.trigger('hide-loading');
			});
        },

        view_obj: function(e) {
            e.preventDefault();
        },

        edit_obj: function(e) {
            e.preventDefault();
            //TODO:
        },

        delete_obj: function(e) {
            e.preventDefault();
            console.log(JSON.stringify(this.collection));
            // console.log(JSON.stringify(roleColl.columns));
            _.invoke(this.collection.selected(), 'destroy');
            commonUtils.remove_selected_row(this.datatable);
        },

    });

    module.exports = baseMgmtView;
});
