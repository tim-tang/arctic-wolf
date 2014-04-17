define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var roleColl = require('../collection/role-coll');
    var roleModel = require('../model/role-model');
    var commonUtils = require('../../common/common-utils');
    var commonLoading = require('../../common/common-loading');
    var roleDatatable;

    var roleMgmt = Backbone.View.extend({

        manage: true,

        prefix: "role-mgmt/templates/",

        template: 'role-mgmt.html',

		events: {
            'click #role-mgmt-delete': 'delete_role',
            'click #role-mgmt-edit': 'edit_role',
            'click #role-mgmt-view': 'view_role'
         },

        initialize: function() {
            this.listenTo(roleColl, 'request', this.show_loading);
            this.listenTo(roleColl, 'remove', this.hide_loading);
            this.listenTo(roleColl, 'sync', this.after_load_roles);
        },

        afterRender: function() {
            roleColl.fetch();
        },

        show_loading: function() {
            commonLoading.init('#main-content');
        },

        hide_loading: function() {
            commonLoading.destroy();
        },

        after_load_roles: function() {
        	// console.log(JSON.stringify(roleColl));
        	// console.log(JSON.stringify(roleColl.columns));
        	// console.log(JSON.stringify(roleColl.data));
            commonUtils.generate_datatable(roleColl.columns, roleColl.toJSON(), 'role-mgmt-datatable', function(datatable) {
	            roleDatatable = datatable;
	            $('#role-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_role_id = $(this).find("td:first").html().trim();
	                var roleModel = roleColl.get(selected_role_id);
	                roleModel.toggle_select();
	            });
            	commonLoading.destroy();
			});
        },

        view_role: function(e) {
            e.preventDefault();            
            this.roleDetailsApp = require('../role-details-app');
            this.roleDetailsApp.render();
        },

        edit_role: function(e) {
            e.preventDefault();
            //TODO:
        },

        delete_role: function(e){
            e.preventDefault();
            _.invoke(roleColl.selected(), 'destroy');
            commonUtils.remove_selected_row(roleDatatable);
        }
    });

    module.exports = roleMgmt;
});
