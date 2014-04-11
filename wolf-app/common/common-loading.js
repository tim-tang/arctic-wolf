define(function(require, exports, module) {
    var $ = require('$');
    module.exports = {

        init: function(selector) {
            var parent = $(selector);
            var loading = $('<div id="loading" class="loading"><i class="fa fa-spinner"></i></div>');
            loading.appendTo(parent);
            loading.fadeIn(0);
        },

        destroy: function(){
            $('#loading').remove();
        }
    }

});
