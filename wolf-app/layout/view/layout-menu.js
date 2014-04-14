define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var commonUtils = require('../../common/common-utils');

    var layoutMenu = Backbone.View.extend({
        manage: true,
        prefix: "layout/templates/",
        template: 'layout-menu.html',

        events: {
             //'click ul.cl-vnavigation li': 'active_menu_item'
         },

         active_menu_item: function(e){
                console.log(e);
         },

        afterRender: function(){
            //TODO: add behavior-core after loaded complete.
            require('behavior-core');
            commonUtils.active_menu_item();
        }
    });

    module.exports = layoutMenu;
});
