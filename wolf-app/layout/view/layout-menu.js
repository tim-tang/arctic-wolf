define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');

    var layoutMenu = Backbone.View.extend({
        manage: true,
        prefix: "layout/templates/",
        template: 'layout-menu.html',

        initialize: function(){
            eventBus.on('active-menu-item', this.active_menu_item, this);
        },

        events: {
             'click ul.cl-vnavigation li': 'active_menu_item'
         },

        afterRender: function(){
            //TODO: add behavior-core after loaded complete.
            require('behavior-core');
            this.active_menu_item();
        },

        active_menu_item: function(){
            $('ul.cl-vnavigation li').each(function(index, li) {
                var $clink = li.children[0];
                if ($clink.href == String(window.location)) {
                    $(this).addClass('active');
                } else{
                    $(this).removeClass('active');
                }
            });
        }
    });

    module.exports = layoutMenu;
});
