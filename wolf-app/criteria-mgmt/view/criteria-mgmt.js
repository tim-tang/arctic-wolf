define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    var commonUtils = require('../../common/common-utils');
    var commonLoading = require('../../common/common-loading');
    var criteriaDatatable;

    var criteriaMgmt = Backbone.View.extend({

        manage: true,

        prefix: "criteria-mgmt/templates/",

        template: 'criteria-mgmt.html',

		events: {
            'click #criteria-mgmt-delete': 'delete_criteria',
            'click #criteria-mgmt-edit': 'edit_criteria',
            'click #criteria-mgmt-view': 'view_criteria'
         },

        initialize: function() {
            this.listenTo(criteriaColl, 'request', this.show_loading);
            this.listenTo(criteriaColl, 'remove', this.hide_loading);
            this.listenTo(criteriaColl, 'sync', this.after_load_criterias);
        },

        afterRender: function() {
            criteriaColl.fetch();
        },

        show_loading: function() {
            commonLoading.init('#main-content');
        },

        hide_loading: function() {
            commonLoading.destroy();
        },

        after_load_criterias: function() {
        	// console.log(JSON.stringify(criteriaColl));
        	// console.log(JSON.stringify(criteriaColl.columns));
        	// console.log(JSON.stringify(criteriaColl.data));
            commonUtils.generate_datatable(criteriaColl.columns, criteriaColl.toJSON(), 'criteria-mgmt-datatable', function(datatable) {
	            criteriaDatatable = datatable;
	            $('#criteria-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_criteria_id = $(this).find("td:first").html().trim();
	                var criteriaModel = criteriaColl.get(selected_criteria_id);
	                criteriaModel.toggle_select();
	            });
            	commonLoading.destroy();
			});
        },

        view_criteria: function(e) {
            e.preventDefault();
            //TODO:
        },

        edit_criteria: function(e) {
            e.preventDefault();
            //TODO:
        },

        delete_criteria: function(e){
            e.preventDefault();
            _.invoke(criteriaColl.selected(), 'destroy');
            commonUtils.remove_selected_row(criteriaDatatable);
        }
    });

    module.exports = criteriaMgmt;
});
