define(function(require, exports, module) {

	var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var eventBus = require('../app-main/app-eventbus');
    
    var baseApp = Backbone.Layout({

        manage: true,
        
		keep: true,
		
		initialize: function() {
            this.subviews = [];
            eventBus.on('show-loading', this.show_loading, this);
            eventBus.on('hide-loading', this.hide_loading, this);
        },
        
        show_loading: function() {
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },
        
        afterRender: function() {}
        
    });

    module.exports = baseApp;
});
