define(function(require, exports, module) {

	var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var eventBus = require('../../app-main/app-eventbus');
    
    var baseView = Backbone.View.extend({

        manage: true,

        show_loading: function() {
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },
    });

    module.exports = baseView;
});
