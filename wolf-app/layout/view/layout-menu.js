define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var commonUtils = require('../../common/common-utils');

    var layoutMenu = Backbone.View.extend({
        manage: true,
        template: 'layout/templates/layout-menu.html',

        events: {
             //'click ul.cl-vnavigation li': 'active_menu_item'
         },

        afterRender: function(){
            //TODO: add behavior-core after loaded complete.
            require('behavior-core');
            commonUtils.active_menu_item();
        }
    });

    module.exports = layoutMenu;
});
