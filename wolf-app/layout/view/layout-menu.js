define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');

    var layoutMenu = Backbone.View.extend({
        manage: true,
        template: 'layout/templates/layout-menu.html',

        afterRender: function(){
            require('behavior-core');
            this.ready_navigation_menu();
        },

        ready_navigation_menu: function() {
            $('ul.cl-vnavigation li').each(function(index, li) {
                var sub_menus = $(li).find('ul');
                //if (sub_menus.length > 0) {
                //    return;
                //}
                var $clink = li.children[0];
                if ($clink.href == String(window.location)) {
                    $(this).addClass('active');
                }
            });
        }
    });

    module.exports = layoutMenu;
});