define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    //var Backbone = require('backbone');
	var BaseMgmtView = require('../../base/view/base-mgmt-view');
	
    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var roleColl = require('../collection/role-coll');
    var roleModel = require('../model/role-model');
    
    var roleMgmt = BaseMgmtView.extend({

        prefix: "role-mgmt/templates/",

        template: 'role-mgmt.html',
        
        datatable_id: 'role-mgmt-datatable',
        
        collection: roleColl,

        initialize: function() {
            this.listenTo(roleColl, 'request', this.show_loading);
            this.listenTo(roleColl, 'remove', this.hide_loading);
            this.listenTo(roleColl, 'sync', this.load_objects);
        },

		view_obj: function(e) {
            this.view_obj(e);
            this.roleDetailsApp = require('../role-details-app');
            this.roleDetailsApp.render();
        },
        
        afterRender: function() {
            roleColl.fetch();
        },
        
        load_objects: function() {
        	//this.constructor.__super__.load_objects(this);
        	
			self = this;
			// Inital Datatable
			componentFacade.init_datatable(this.datatable_id, {data: roleColl.toJSON(), header: roleColl.columns}, function(datatable) {
				self.datatable = datatable;
				$(this.datatable_id).on('click', 'tbody tr', function(e) {
					$(this).toggleClass('row_selected');
					var selected_id = $(this).find("td:first").html().trim();
					var model = roleColl.get(selected_id);
					model.toggle_select();
				});
				eventBus.trigger('hide-loading');
			});		
        }
    });

    module.exports = roleMgmt;
});
