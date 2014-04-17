define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var userColl = require('../collection/user-coll');
    var userModel = require('../model/user-model');

    var userMgmt = Backbone.View.extend({

        manage: true,

        prefix: "user-mgmt/templates/",

        template: 'user-mgmt.html',
        
        datatable: null,

		events: {
            'click #user-mgmt-delete': 'delete_user',
            'click #user-mgmt-edit': 'edit_user',
            'click #user-mgmt-view': 'view_user'
         },

        initialize: function() {
            this.listenTo(userColl, 'request', this.show_loading);
            this.listenTo(userColl, 'remove', this.hide_loading);
            this.listenTo(userColl, 'sync', this.after_load_users);
        },

        afterRender: function() {
            userColl.fetch();
        },

        show_loading: function() {
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },

        after_load_users: function() {
        	self = this;
			// Inital Datatable
            componentFacade.init_datatable('user-mgmt-datatable', {data: userColl.toJSON(), header: userColl.columns}, function(datatable) {
	            self.datatable = datatable;
	            $('#user-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_user_id = $(this).find("td:first").html().trim();
	                var userModel = userColl.get(selected_user_id);
	                userModel.toggle_select();
	            });
                eventBus.trigger('hide-loading');
			});
        },

        view_user: function(e) {
            e.preventDefault();
            //TODO:
        },

        edit_user: function(e) {
            e.preventDefault();
            //TODO:
        },

        delete_user: function(e) {
            e.preventDefault();
            _.invoke(userColl.selected(), 'destroy');
            commonUtils.remove_selected_row(this.datatable);
        }
    });

    module.exports = userMgmt;
});
