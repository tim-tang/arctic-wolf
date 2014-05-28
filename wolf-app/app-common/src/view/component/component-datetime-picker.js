define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;

    var componentDateTimePicker = Backbone.View.extend({

        manage : true,

        prefix : 'app-common/src/tpl/component/',

        template : 'component-datetime-picker.html',

        initialize : function(options) {
            this.options = options;
            eventBus.off('component-datetime-picker:renderDateTimePicker:' + options["component_id"]);
            eventBus.on('component-datetime-picker:renderDateTimePicker:' + options["component_id"], this.renderDateTimePicker, this);
            
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

        renderDateTimePicker : function() {
            console.log(">>>>>>>>>>>>>>>>>>>>>>in renderDateTimePicker");
            this.$el.children('.datetime').datetimepicker({format: 'yyyy-mm-dd hh:ii'});
        },

        serialize : function() {
            return {
                options : _.clone(this.options)
            };
        }
    });

    module.exports = componentDateTimePicker;
});