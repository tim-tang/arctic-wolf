define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;

    var layoutMenu = Backbone.View.extend({
        manage: true,
        prefix: "layout/templates/",
        template: 'layout-menu.html',

        initialize: function() {
            eventBus.on('layout:active-menu-item', this.active_menu_item, this);
        },

        events: {
            'click ul.cl-vnavigation li': 'active_menu_item'
        },

        afterRender: function() {
            //add layout behavior after loaded complete.
            var layoutBehavior = require('../behavior/layout-behavior');
            layoutBehavior.init();
            this.active_menu_item();
        },

        active_menu_item: function(event) {
            if (event) {
                event.preventDefault();
            }
            $('ul.cl-vnavigation li').each(function(index, li) {
                var $clink = li.children[0];
                if ($clink.href == String(window.location)) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }
    });

    module.exports = layoutMenu;
});
