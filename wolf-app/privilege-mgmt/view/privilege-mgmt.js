define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var privilegeColl = require('../collection/privilege-coll');
    var privilegeModel = require('../model/privilege-model');
    var commonUtils = require('../../common/common-utils');
    var commonLoading = require('../../common/common-loading');
    var privilegeDatatable;

    var privilegeMgmt = Backbone.View.extend({

        manage: true,

        prefix: "privilege-mgmt/templates/",

        template: 'privilege-mgmt.html',

		events: {
            'click #privilege-mgmt-delete': 'delete_privilege',
            'click #privilege-mgmt-edit': 'edit_privilege',
            'click #privilege-mgmt-view': 'view_privilege'
         },

        initialize: function() {
            this.listenTo(privilegeColl, 'request', this.show_loading);
            this.listenTo(privilegeColl, 'remove', this.hide_loading);
            this.listenTo(privilegeColl, 'sync', this.after_load_privileges);
        },

        afterRender: function() {
            privilegeColl.fetch();
        },

        show_loading: function() {
            commonLoading.init('#main-content');
        },

        hide_loading: function() {
            commonLoading.destroy();
        },

        after_load_privileges: function() {
        	// console.log(JSON.stringify(privilegeColl));
        	// console.log(JSON.stringify(privilegeColl.columns));
        	// console.log(JSON.stringify(privilegeColl.data));
            commonUtils.generate_datatable(privilegeColl.columns, privilegeColl.toJSON(), 'privilege-mgmt-datatable', function(datatable) {
	            privilegeDatatable = datatable;
	            $('#privilege-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_privilege_id = $(this).find("td:first").html().trim();
	                var privilegeModel = privilegeColl.get(selected_privilege_id);
	                privilegeModel.toggle_select();
	            });
            	commonLoading.destroy();
			});
        },

        view_privilege: function(e) {
            e.preventDefault();
            //TODO:
        },

        edit_privilege: function(e) {
            e.preventDefault();
            //TODO:
        },

        delete_privilege: function(e){
            e.preventDefault();
            _.invoke(privilegeColl.selected(), 'destroy');
            commonUtils.remove_selected_row(privilegeDatatable);
        }
    });

    module.exports = privilegeMgmt;
});
