define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var privilegeColl = require('../collection/privilege-coll');
    var privilegeModel = require('../model/privilege-model');

    var privilegeMgmt = Backbone.View.extend({

        manage: true,

        prefix: "privilege-mgmt/templates/",

        template: 'privilege-mgmt.html',
        
        datatable: null,

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
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },

        after_load_privileges: function() {
			self = this;
			// Inital Datatable
            componentFacade.init_datatable('privilege-mgmt-datatable', {data: privilegeColl.toJSON(), header: privilegeColl.columns}, function(datatable) {
	            self.datatable = datatable;
	            $('#privilege-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_privilege_id = $(this).find("td:first").html().trim();
	                var privilegeModel = privilegeColl.get(selected_privilege_id);
	                privilegeModel.toggle_select();
	            });
	            eventBus.trigger('hide-loading');
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
            commonUtils.remove_selected_row(this.datatable);
        }
    });

    module.exports = privilegeMgmt;
});
