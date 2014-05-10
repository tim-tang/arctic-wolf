 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var eventBus = require('../app-core/app-core-index').Eventbus;
    var appCommon = require('../app-common/app-common-index');
	var commonLoading = appCommon.CommonLoading;

	var userGroupMgmt = require('./view/user-group-mgmt');
	var userGroupModal = require('./view/user-group-new-modal');

	var userGroupApp = new Backbone.Layout({

		//el: '#main-content',

        manage: true,

        prefix: "user-group-mgmt/templates/",

        template: 'user-group-container.html',

	    events: {
            //TODO:
        },

        initialize: function() {
            eventBus.on('show-loading', this.show_loading, this);
            eventBus.on('hide-loading', this.hide_loading, this);
        },

        afterRender: function() {
			var userGroupMgmtView = new userGroupMgmt();
            this.insertView('#user-group-home', userGroupMgmtView).render();
			var userGroupModalView = new userGroupModal();
            this.insertView('#user-group-home', userGroupModalView).render();
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
            viewManager.show('#main-content', userGroupApp);
        },

        invokeUserGroupRouter: function() {
            var userGroupRouter = require('./router/user-group-router');
            return new userGroupRouter('user-group-mgmt/', {
                createTrailingSlashRoutes: true
            });
        }
    };
 });
