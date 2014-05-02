 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	
    var eventBus = require('../app-main/app-eventbus');
    var viewManager = require('../app-main/app-view-manager');
    
    var roleGeneralInfo = require('./view/tab/role-general-info');

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
            this.insertView('#generalInfo', roleGeneralInfoView).render();
        },
        
        active_tab: function() {
			$('div.tab-pane cont').each(function(index, li) {
				var $clink = li.children[0];
				alert($clink.href);
				alert(String(window.location));
				if ($clink.href == String(window.location)) {
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
