 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	
    var eventBus = require('../app-main/app-eventbus');
    var viewManager = require('../app-main/app-view-manager');
    
    var roleGeneralInfo = require('./view/tab/role-general-info');
    var rolePrivilege = require('./view/tab/role-privilege');
    var roleUser = require('./view/tab/role-user');
    var roleUsergroup = require('./view/tab/role-user-group');
    var roleHistory = require('./view/tab/role-history');

	var roleDetailsApp = new Backbone.Layout({

		// el: '#main-content',

        manage: true,

        prefix: "role-mgmt/templates/",

        template: 'role-details-container.html',
        
        initialize: function() {
            //eventBus.on('role:render-role-tab', this.render_role_tab, this);
		},

	    events: {
             'click ul.nav-tabs li': 'active_tab'
        },
		
        afterRender: function() {
			var roleGeneralInfoView = new roleGeneralInfo();
            this.insertView('#general-info', roleGeneralInfoView).render();
            
            var rolePrivilegeView = new rolePrivilege();
            this.insertView('#privilege', rolePrivilegeView).render();
            
            var roleUserView = new roleUser();
            this.insertView('#user', roleUserView).render();
            
            var roleUsergroupView = new roleUsergroup();
            this.insertView('#user-group', roleUsergroupView).render();
            
			var roleHistoryView = new roleHistory();
            this.insertView('#history', roleHistoryView).render();
        },
        
        active_tab: function(event) {
            if (event) event.preventDefault();
        
			var $clink = event.currentTarget.textContent;
            var tabs = event.currentTarget.parentNode.children;
            var $clinkIndex = 0;
            
            for(;tabs.length; $clinkIndex++) {
            	if($clink === tabs[$clinkIndex].textContent)
					break;
            }
            
			$('div.tab-pane').each(function(index) {
				if ($clinkIndex === index) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			});
        }
    });
    
	module.exports = {
        run: function(viewManager) {
            viewManager.show('#main-content', roleDetailsApp);
        }
    };
 });
