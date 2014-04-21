 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	
	var eventBus = require('../app-main/app-eventbus');
	var commonLoading = require('../common/common-loading');

	var userMgmt = require('./view/user-mgmt');
	var userModal = require('./view/user-new-modal');

	var userApp = new Backbone.Layout({

		//el: '#main-content',

        manage: true,

        keep: true,

        prefix: "user-mgmt/templates/",

        template: 'user-container.html',

        initialize: function() {
            this.subviews = [];
            eventBus.on('show-loading', this.show_loading, this);
            eventBus.on('hide-loading', this.hide_loading, this);
        },
        
        afterRender: function() {
			var userMgmtView = new userMgmt();
            this.insertView('#user-home', userMgmtView).render();
            this.subviews.push(userMgmtView);
            
			var userModalView = new userModal();
            this.insertView('#user-home', userModalView).render();
            this.subviews.push(userModalView);
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
            viewManager.show(userApp);
        }
    };
 });
