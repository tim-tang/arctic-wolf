define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var userColl = require('../collection/user-coll');
    var userModel = require('../model/user-model');
    var commonUtils = require('../../common/common-utils');
    var commonLoading = require('../../common/common-loading');
    var userDatatable;

    var userMgmt = Backbone.View.extend({

        manage: true,

        prefix: "user-mgmt/templates/",

        template: 'user-mgmt.html',

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
            commonLoading.init('#main-content');
        },

        hide_loading: function() {
            commonLoading.destroy();
        },

        after_load_users: function() {
        	// console.log(JSON.stringify(userColl));
        	// console.log(JSON.stringify(userColl.columns));
        	// console.log(JSON.stringify(userColl.data));
            commonUtils.generate_datatable(userColl.columns, userColl.toJSON(), 'user-mgmt-datatable', function(datatable) {
	            userDatatable = datatable;
	            $('#user-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_user_id = $(this).find("td:first").html().trim();
	                var userModel = userColl.get(selected_user_id);
	                userModel.toggle_select();
	            });
            	commonLoading.destroy();
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

        delete_user: function(e){
            e.preventDefault();
            _.invoke(userColl.selected(), 'destroy');
            commonUtils.remove_selected_row(userDatatable);
        }
    });

    module.exports = userMgmt;
});
