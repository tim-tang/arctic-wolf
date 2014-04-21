define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseMgmtView = require('../../base/view/base-mgmt-view');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var privilegeColl = require('../collection/privilege-coll');
    var privilegeModel = require('../model/privilege-model');

    var privilegeMgmt = BaseMgmtView.extend({
    	
        prefix: "privilege-mgmt/templates/",

        template: 'privilege-mgmt.html',
        
        datatable_id: 'privilege-mgmt-datatable',
        
        collection: privilegeColl,

        initialize: function() {
            this.listenTo(privilegeColl, 'request', this.show_loading);
            this.listenTo(privilegeColl, 'remove', this.hide_loading);
            this.listenTo(privilegeColl, 'sync', this.load_objects);
        },

        afterRender: function() {
            privilegeColl.fetch();
        },

        load_objects: function() {
			//this.constructor.__super__.load_objects(this);
        	
			self = this;
			// Inital Datatable
			componentFacade.init_datatable(this.datatable_id, {data: privilegeColl.toJSON(), header: privilegeColl.columns}, function(datatable) {
				self.datatable = datatable;
				$(this.datatable_id).on('click', 'tbody tr', function(e) {
					$(this).toggleClass('row_selected');
					var selected_id = $(this).find("td:first").html().trim();
					var model = privilegeColl.get(selected_id);
					model.toggle_select();
				});
				eventBus.trigger('hide-loading');
			});        
		}
    });

    module.exports = privilegeMgmt;
});
