define(function(require, exports, module) {
    var $ = require('$');

    module.exports = {

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
    };
});
