define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    
    var criteriaMgmt = Backbone.View.extend({

        manage: true,

        prefix: "criteria-mgmt/templates/",

        template: 'criteria-mgmt.html',
        
        datatable: null,

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
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },

        after_load_criterias: function() {
        	self = this;
			// Inital Datatable
            componentFacade.init_datatable('criteria-mgmt-datatable', {data: criteriaColl.toJSON(), header: criteriaColl.columns}, function(datatable) {
	            self.datatable = datatable;
	            $('#criteria-mgmt-datatable').on('click', 'tbody tr', function(e) {
	                $(this).toggleClass('row_selected');
	                var selected_criteria_id = $(this).find("td:first").html().trim();
	                var criteriaModel = criteriaColl.get(selected_criteria_id);
	                criteriaModel.toggle_select();
	            });
	            eventBus.trigger('hide-loading');
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
            commonUtils.remove_selected_row(this.datatable);
        }
    });

    module.exports = criteriaMgmt;
});
