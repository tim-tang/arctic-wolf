define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseMgmtView = require('../../base/view/base-mgmt-view');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    
    var criteriaMgmt = BaseMgmtView.extend({

        manage: true,

        prefix: "criteria-mgmt/templates/",

        template: 'criteria-mgmt.html',
        
        datatable_id: 'criteria-mgmt-datatable',
        
        collection: criteriaColl,
        
        initialize: function() {
            this.listenTo(criteriaColl, 'request', this.show_loading);
            this.listenTo(criteriaColl, 'remove', this.hide_loading);
            this.listenTo(criteriaColl, 'sync', this.load_objects);
        },

        afterRender: function() {
            criteriaColl.fetch();
        },
        
        load_objects: function() {
			//this.constructor.__super__.load_objects(this);
        	
			self = this;
			// Inital Datatable
			componentFacade.init_datatable(this.datatable_id, {data: criteriaColl.toJSON(), header: criteriaColl.columns}, function(datatable) {
				self.datatable = datatable;
				$(this.datatable_id).on('click', 'tbody tr', function(e) {
					$(this).toggleClass('row_selected');
					var selected_id = $(this).find("td:first").html().trim();
					var model = criteriaColl.get(selected_id);
					model.toggle_select();
				});
				eventBus.trigger('hide-loading');
			});        
		}    
	});

    module.exports = criteriaMgmt;
});
