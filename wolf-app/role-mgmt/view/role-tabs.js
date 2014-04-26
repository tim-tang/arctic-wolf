define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var commonUtils = require('../../common/common-utils');
    var eventBus = require('../../app-main/app-eventbus');

    var roleDetails = Backbone.View.extend({

        manage: true,

        prefix: "role-mgmt/templates/tab/",

        template: 'role-tabs.html',

        initialize: function(){
            eventBus.on('active_tab', this.active_tab, this);
        },

        events: {
             'click ul.nav-tabs li': 'active_menu_item'
        },

        afterRender: function(){
            // replace legacy behavior core with layout behavior.
            require('../../layout/behavior/layout-behavior').init_layout_misc();
            this.active_tab();
        },

        active_tab: function(){
            $('ul.nav-tabs li').each(function(index, li) {
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
            });
        }
    });

    module.exports = roleDetails;
});
