define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseMgmtView = require('../../base/view/base-mgmt-view');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var userColl = require('../collection/user-coll');
    var userModel = require('../model/user-model');

    var userMgmt = BaseMgmtView.extend({
    	
        prefix: "user-mgmt/templates/",

        template: 'user-mgmt.html',
        
        datatable_id: 'user-mgmt-datatable',
        
        collection: userColl,

        initialize: function() {
            this.listenTo(userColl, 'request', this.show_loading);
            this.listenTo(userColl, 'remove', this.hide_loading);
            this.listenTo(userColl, 'sync', this.load_objects);
        },

        afterRender: function() {
            userColl.fetch();
        },

        load_objects: function() {
			//this.constructor.__super__.load_objects(this);
        	
			self = this;
			// Inital Datatable
			componentFacade.init_datatable(this.datatable_id, {data: userColl.toJSON(), header: userColl.columns}, function(datatable) {
				self.datatable = datatable;
				$(this.datatable_id).on('click', 'tbody tr', function(e) {
					$(this).toggleClass('row_selected');
					var selected_id = $(this).find("td:first").html().trim();
					var model = userColl.get(selected_id);
					model.toggle_select();
				});
				eventBus.trigger('hide-loading');
			});        
		}
    });

    module.exports = userMgmt;
});
