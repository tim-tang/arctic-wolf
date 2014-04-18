define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var roleColl = require('../collection/role-coll');
    var roleModel = require('../model/role-model');

    var roleMgmt = Backbone.View.extend({

        manage: true,

        prefix: "role-mgmt/templates/",

        template: 'role-mgmt.html',

        datatable: null,

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
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },

        after_load_roles: function() {
        	self = this;
			// Inital Datatable
            componentFacade.init_datatable('role-mgmt-datatable', {data: roleColl.toJSON(), header: roleColl.columns}, function(datatable) {
	            self.datatable = datatable;
	            $('#role-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_role_id = $(this).find("td:first").html().trim();
	                var roleModel = roleColl.get(selected_role_id);
	                roleModel.toggle_select();
	            });
	            eventBus.trigger('hide-loading');
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
            commonUtils.remove_selected_row(this.datatable);
        }
    });

    module.exports = roleMgmt;
});
