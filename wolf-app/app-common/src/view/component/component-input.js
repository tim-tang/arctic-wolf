define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;

    require('select2');
    require('switch');
    require('bt-touchspin');

    var componentSelect = Backbone.View.extend({

        manage : true,

        prefix : 'app-common/src/tpl/component/',

        template : 'component-input.html',

        initialize : function(options) {
            this.options = options;
            eventBus.off('component-input:renderInput:' + options["component_id"]);
            eventBus.on('component-input:renderInput:' + options["component_id"], this.renderInput, this);
        },

        renderInput: function() {
            console.log(">>>>>>>>>>>>>>>>>>>>>>in renderSelect");
            var type = this.options["component_type"];

            // Fetch component_id
            var component_id = this.options["component_id"];
            var container_id = this.options["container_id"];

            var _input = this.$el.find('input');

            // If component_id is not null, then set id to this select
            if (component_id) {
                _input.attr("id", component_id);
            }

            //TODO: refactor to use switch.
            if (!type || type === 'CHECKBOX')
                this.makeCheckbox(_input);
            else if (type === 'TAGS')
                this.makeTags(_input);
            else if (type === 'SLIDE_RANGE')
                this.makeSlideRange(_input, this.options["options"]);
            else if (type === 'TOUCH_SPINE')
                this.makeTouchspine(_input, this.options["options"]);

            // If container_id is not null, then append this select to its container
            if(!container_id)
                container_id = component_id + '-container';
            var input_container = '#' + container_id;
            // Remove existing input
            if ($(input_container).children())
                $(input_container).children('input').remove();
            this.$el.appendTo(input_container);
        },

        // Checkbox
        makeCheckbox : function(input) {
            // Set type
            input.attr('type', 'checkbox');
            this.$el.attr('class', 'switch');
            this.$el.bootstrapSwitch();
        },

        // Tags
        makeTags : function(input) {
			// Set type
            input.attr('type', 'hidden');
            // Set CSS
            input.attr('class', 'tags');
            // Set value
            input.attr('value', 'brown,blue,green');
            input.select2({
                tags: 0,
                width: '100%'
            });
        },

        // Slide Range
        makeSlideRange : function(input, options) {
            // Set type
            input.attr('type', 'text');
            // Set CSS
            input.attr('class', 'bslider form-control');
            input.attr('data-slider-tooltip', 'hide');
            input.attr('data-slider-value', '[1,100000]');
            input.attr('data-slider-step', '5');
            input.attr('data-slider-max', '100000');
            input.attr('data-slider-min', '1');
            input.attr('value', '');

            input.slider().on("slide", function(e) {
                $(options.min_selector).html("¥"+e.value[0]);
                $(options.max_selector).html("¥"+e.value[1]);
            });
        },

        // Touchspine
        makeTouchspine : function(input, options) {
             input.TouchSpin({
                min: options.min,
                max: options.max,
                stepinterval: options.interval,
                maxboostedstep: 10000000,
                prefix: options.prefix
            });
        },

        serialize : function() {
            return {
                options : _.clone(this.options)
            };
        }
    });

    module.exports = componentSelect;
});
