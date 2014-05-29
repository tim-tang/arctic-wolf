define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;

    var componentImageUpload = Backbone.View.extend({

        manage : true,

        prefix : 'app-common/src/tpl/component/',

        template : 'component-image-upload.html',

        initialize : function(options) {
            this.options = options;
            eventBus.off('component-image-upload:renderImageUpload:' + options["component_id"]);
            eventBus.on('component-image-upload:renderImageUpload:' + options["component_id"], this.renderImageUpload, this);
        },

        renderImageUpload: function() {
        	var component_id = this.options["component_id"];
            var container_id = this.options["container_id"];

            // If container_id is not null, then append this DateTime to its container
            if(!container_id)
                container_id = component_id + '-container';
            var datetime_container = '#' + container_id;
            // Remove existing multi DateTime
            if ($(datetime_container).children())
                $(datetime_container).children('div#' + component_id).remove();
            this.$el.appendTo(datetime_container);
        },

        serialize : function() {
            return {
                options : _.clone(this.options)
            };
        }
    });

    module.exports = componentImageUpload;
});
