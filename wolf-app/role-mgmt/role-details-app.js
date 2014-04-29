 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	
    var eventBus = require('../app-main/app-eventbus');
    var viewManager = require('../app-main/app-view-manager');

	var roleDetailsApp = new Backbone.Layout({

		// el: '#main-content',

        manage: true,

        prefix: "role-mgmt/templates/",

        template: 'role-details-container.html',
        
        initialize: function() {
            eventBus.on('role:render-role-tab', this.render_role_tab, this);
		},

	    events: {
            //TODO:
        },
		
        afterRender: function() {
        	alert("1111");
        	require('./view/role-tabs').run(viewManager);
        	alert("2222");
        	eventBus.trigger('role:active-tab');
		 	// this.insertView('#tabs-container', new roleTabs()).render();
        },
        
        render_role_tab: function() {
        	alert("render_role_tab");
        }
    });
    
	module.exports = {
        run: function(viewManager) {
            viewManager.show('#main-content', roleDetailsApp);
        }
    };
 });
