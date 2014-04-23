define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    require('select2');

    var componentSelect2 = Backbone.View.extend({

        manage: true,
        
        prefix: 'common/tpl/',
        
        template: 'component-select2.html',

		initialize: function(options) {
        	this.selector = options.selector;
            this.options = options.attrs;
        },

        afterRender: function() {
        	// Set selector id
            $(this.selector).attr("id", this.options["selector_id"]);
            if(this.options["multiple"] === 'yes')
            	$(this.selector).attr("multiple", "multiple");
            	
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
