define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    require('select2');

    var componentSelect2 = Backbone.View.extend({

        manage: true,

        prefix: 'app-common/src/tpl/component/',

        template: 'component-select2.html',

		initialize: function(options) {
        	this.selector = options.selector;
            this.options = options.attrs;
        },

        afterRender: function() {
        },

        serialize: function() {
        	return { options: _.clone(this.options)};
        }
    });

    module.exports = componentSelect2;
});
