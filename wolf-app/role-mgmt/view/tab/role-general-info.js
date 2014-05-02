define(function(require, exports, module) {

    var $ = require('$');
    var BaseView = require('../../../base/view/base-view');
    var detailsViewMixin = require('../../../base/mixin/details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');

    var roleGeneralInfo = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        template: 'role-general-info.html',

        initialize: function() {
            //eventBus.on('active_tab', this.active_tab, this);
            eventBus.on('role:active-tab', this.active_tab, this);
        },

        events: {
             'click ul.nav-tabs li': 'active_tab'
        },

        afterRender: function() {
            // replace legacy behavior core with layout behavior.
			// require('../../layout/behavior/layout-behavior').init_layout_misc();
            //this.active_tab();
        },

        active_tab: function() {
        	alert("asdf");
        	/*
						$('div.tab-pane cont').each(function(index, li) {
							//var sub_menus = $(li).find('ul');
							//if (sub_menus.length > 0) {
							//    return;
							//}
							var $clink = li.children[0];
							if ($clink.href == String(window.location)) {
								$(this).addClass('active');
							} else {
								$(this).removeClass('active');
							}
						});*/
			
        }
    });

	roleGeneralInfo.mixin(detailsViewMixin);

    module.exports = roleGeneralInfo;
});
