define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseMgmtView = require('../../base/view/base-mgmt-view');

	var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var userGroupColl = require('../collection/user-group-coll');
    var userGroupModel = require('../model/user-group-model');
    
    var userGroupMgmt = BaseMgmtView.extend({

        prefix: "user-group-mgmt/templates/",

        template: 'user-group-mgmt.html',
        
        datatable_id: 'user-group-mgmt-datatable',
        
        collection: userGroupColl,

        initialize: function() {
            this.listenTo(userGroupColl, 'request', this.show_loading);
            this.listenTo(userGroupColl, 'remove', this.hide_loading);
            this.listenTo(userGroupColl, 'sync', this.load_objects);
        },

        afterRender: function() {
            userGroupColl.fetch();
        },

        load_objects: function() {
			//this.constructor.__super__.load_objects(this);
        	
			self = this;
			// Inital Datatable
			componentFacade.init_datatable(this.datatable_id, {data: userGroupColl.toJSON(), header: userGroupColl.columns}, function(datatable) {
				self.datatable = datatable;
				$(this.datatable_id).on('click', 'tbody tr', function(e) {
					$(this).toggleClass('row_selected');
					var selected_id = $(this).find("td:first").html().trim();
					var model = userGroupColl.get(selected_id);
					model.toggle_select();
				});
				eventBus.trigger('hide-loading');
			});        
		}
    });

    module.exports = userGroupMgmt;
});
