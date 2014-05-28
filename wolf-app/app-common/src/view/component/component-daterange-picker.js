define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;

    var componentDateRangePicker = Backbone.View.extend({

        manage : true,

        prefix : 'app-common/src/tpl/component/',

        template : 'component-daterange-picker.html',

        initialize : function(options) {
            this.options = options;
            eventBus.off('component-daterange-picker:renderDateRangePicker:' + options["component_id"]);
            eventBus.on('component-daterange-picker:renderDateRangePicker:' + options["component_id"], this.renderDateRangePicker, this);
            
            var component_id = this.options["component_id"];
            var container_id = this.options["container_id"];

            // If container_id is not null, then append this daterange to its container
            if(!container_id)
                container_id = component_id + '-container';
            var daterange_container = '#' + container_id;
            // Remove existing multi daterange
            if ($(daterange_container).children())
                $(daterange_container).children('div#' + component_id).remove();
            this.$el.appendTo(daterange_container);
        },

        renderDateRangePicker : function() {
            console.log(">>>>>>>>>>>>>>>>>>>>>>in renderDateRangePicker");
            
            var selector = '#' + this.options['component_id'];
            var options = this.options['options'];
            var cb = function(start, end) {
                $(selector + ' span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            };

            var optionSet1 = {
                startDate : moment().subtract('days', 29),
                endDate : moment(),
                minDate : options.minDate,
                maxDate : options.maxDate,
                dateLimit : {
                    days : 60
                },
                showDropdowns : true,
                showWeekNumbers : true,
                timePicker : false,
                timePickerIncrement : 1,
                timePicker12Hour : true,
                ranges : {
                    'Today' : [moment(), moment()],
                    'Yesterday' : [moment().subtract('days', 1), moment().subtract('days', 1)],
                    'Last 7 Days' : [moment().subtract('days', 6), moment()],
                    'Last 30 Days' : [moment().subtract('days', 29), moment()],
                    'This Month' : [moment().startOf('month'), moment().endOf('month')],
                    'Last Month' : [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                opens : 'left',
                buttonClasses : ['btn btn-default'],
                applyClass : 'btn-small btn-primary',
                cancelClass : 'btn-small',
                format : 'MM/DD/YYYY',
                separator : ' to ',
                locale : {
                    applyLabel : 'Submit',
                    cancelLabel : 'Clear',
                    fromLabel : 'From',
                    toLabel : 'To',
                    customRangeLabel : 'Custom',
                    daysOfWeek : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay : 1
                }
            };

            $(selector + ' span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            $(selector).daterangepicker(optionSet1, cb);
            $(selector).on('show', function() {
                console.log("show event fired");
            });
            $(selector).on('hide', function() {
                console.log("hide event fired");
            });
            $(selector).on('apply', function(ev, picker) {
                console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
            });

            $(selector).on('cancel', function(ev, picker) {
                console.log("cancel event fired");
            });
        },

        serialize : function() {
            return {
                options : _.clone(this.options)
            };
        }
    });

    module.exports = componentDateRangePicker;
});
