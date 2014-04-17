define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var _ = require('underscore');
    require('select2');

    var componentSelect2 = Backbone.View.extend({

        manage: true,
        prefix: "common/tpl/",
        template: 'component-select2.html',

         initialize: function(options) {
            this.selector = options.selector;
            this.options = options.attrs;
         },

         afterRender: function(){
            $(this.selector).select2({
                width: '100%'
            });
         },

         serialize: function() {
            return { options: _.clone(this.options)};
         }
    });
    module.exports = componentSelect2;
});
