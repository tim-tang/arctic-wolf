define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    require('select2');

    var componentSelect2 = Backbone.View.extend({

        manage: true,
        
        el: '.select2',
        
        prefix: 'common/tpl/',
        
        template: 'component-select2.html',

		initialize: function(options) {
        	this.selector = options.selector;
            this.options = options.attrs;
            
            // Set selector id
            this.$el.attr("id", this.options["selector_id"]);
        },

        afterRender: function() {
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
