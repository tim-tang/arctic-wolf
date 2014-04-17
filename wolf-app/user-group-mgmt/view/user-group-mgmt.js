define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var userGroupColl = require('../collection/user-group-coll');
    var userGroupModel = require('../model/user-group-model');
    
    var userGroupMgmt = Backbone.View.extend({

        manage: true,

        prefix: "user-group-mgmt/templates/",

        template: 'user-group-mgmt.html',
        
        datatable: null,

		events: {
            'click #user-group-mgmt-delete': 'delete_user_group',
            'click #user-group-mgmt-edit': 'edit_user_group',
            'click #user-group-mgmt-view': 'view_user_group'
         },

        initialize: function() {
            this.listenTo(userGroupColl, 'request', this.show_loading);
            this.listenTo(userGroupColl, 'remove', this.hide_loading);
            this.listenTo(userGroupColl, 'sync', this.after_load_user_groups);
        },

        afterRender: function() {
            userGroupColl.fetch();
        },

        show_loading: function() {
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },

        after_load_user_groups: function() {
        	self = this;
			// Inital Datatable
            componentFacade.init_datatable('user-group-mgmt-datatable', {data: userGroupColl.toJSON(), header: userGroupColl.columns}, function(datatable) {
	            self.datatable = datatable;
	            $('#user-group-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_user_group_id = $(this).find("td:first").html().trim();
	                var userGroupModel = userGroupColl.get(selected_user_group_id);
	                userGroupModel.toggle_select();
	            });
            	eventBus.trigger('hide-loading');
			});
        },

        view_user_group: function(e) {
            e.preventDefault();
            //TODO:
        },

        edit_user_group: function(e) {
            e.preventDefault();
            //TODO:
        },

        delete_user_group: function(e){
            e.preventDefault();
            _.invoke(userGroupColl.selected(), 'destroy');
            commonUtils.remove_selected_row(this.datatable);
        }
    });

    module.exports = userGroupMgmt;
});
