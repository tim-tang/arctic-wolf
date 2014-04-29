 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var eventBus = require('../app-main/app-eventbus');
	var commonLoading = require('../common/common-loading');
	var viewManager = require('../app-main/app-view-manager');

	var roleMgmt = require('./view/role-mgmt');
	var roleModal = require('./view/modal/role-new-modal');

	var roleApp = new Backbone.Layout({

		//el: '#main-content',

        manage: true,

        keep: true,

        prefix: "role-mgmt/templates/",

        template: 'role-container.html',

	    events: {
            //TODO:
        },

        initialize: function() {
            this.subviews = [];
            eventBus.on('show-loading', this.show_loading, this);
            eventBus.on('hide-loading', this.hide_loading, this);
            eventBus.on('role:view-role', this.view_role, this);
        },

        afterRender: function() {
			var roleMgmtView = new roleMgmt();
            this.insertView('#role-home', roleMgmtView).render();
            this.subviews.push(roleMgmtView);

			var roleModalView = new roleModal();
            this.insertView('#role-home', roleModalView).render();
            this.subviews.push(roleModalView);
        },

		show_loading: function() {
			commonLoading.init('#main-content');
		},

       	hide_loading: function() {
       		commonLoading.destroy();
		},
		
		view_role: function() {
            require('./role-details-app').run(viewManager);
        }
    });

    module.exports = {
        run: function(viewManager) {
            viewManager.show('#main-content', roleApp);
        }
    };
 });
