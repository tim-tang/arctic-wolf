 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	
	var eventBus = require('../app-main/app-eventbus');
	var commonLoading = require('../common/common-loading');
	
	var userGroupMgmt = require('./view/user-group-mgmt');
	var userGroupModal = require('./view/user-group-new-modal');

	var userGroupApp = new Backbone.Layout({

		//el: '#main-content',

        manage: true,

        keep: true,

        prefix: "user-group-mgmt/templates/",

        template: 'user-group-container.html',

	    events: {
            //TODO:
        },

        initialize: function() {
            this.subviews = [];
            eventBus.on('show-loading', this.show_loading, this);
            eventBus.on('hide-loading', this.hide_loading, this);
        },
        
        afterRender: function() {
			var userGroupMgmtView = new userGroupMgmt();
            this.insertView('#user-group-home', userGroupMgmtView).render();
            this.subviews.push(userGroupMgmtView);
            
			var userGroupModalView = new userGroupModal();
            this.insertView('#user-group-home', userGroupModalView).render();
            this.subviews.push(userGroupModalView);
        },
        
		show_loading: function() {
			commonLoading.init('#main-content');
		},

       	hide_loading: function() {
       		commonLoading.destroy();
		},
    });
    
    module.exports = {
        run: function(viewManager) {
            viewManager.show(userGroupApp);
        }
    };
 });
