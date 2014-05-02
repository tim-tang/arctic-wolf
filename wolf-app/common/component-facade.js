define(function(require, exports, module) {

    var _ = require('underscore');
    var $ = require('$');
    require('jquery-datatables');
    require('datatables');
    require('jasny');
    require('select2');
    //require('switch');
    require('multi-select');
    require('moment');
    require('daterangepicker');
    require('datetimepicker');
    require('bootstrap-slider');
    require('modalEffects');
    require('bt-touchspin');

    var componentFacade = {

        init_by_component_settings: function(componet_settings) {
            var self = this;
            _.each(componet_settings, function(setting) {
                switch (setting.component) {
                case "DATE_RANGE_PICKER":
                    self.init_daterange_picker(setting.selector, setting.options);
                    break;
                case "SELECT2":
                    self.init_select2(setting.selector, setting.options);
                    break;
                case "SELECT2TAG":
                    self.init_select2_tag(setting.selector, setting.options);
                    break;
                case "SLIDER_RANGE":
                    self.init_slider_range(setting.selector, setting.options);
                    break;
                    //TODO: more settings to build the ui component.
                }
            });
        },

        init_datatable: function(selector, options, fnDatatableCallback) {
            var datatable_div = selector + '-div';
            $("#" + datatable_div).html('<table class="table table-bordered" id="' + selector + '"></table>');
            datatable_id = "#" + selector;

            /* Init the table with dynamic ajax loader.*/
            var datatable = $(datatable_id).dataTable({
                "aaData": options.data,
                "aoColumns": options.header
            });

            // Search input style
            $('.dataTables_filter input').addClass('form-control').attr('placeholder', 'Search');
            $('.dataTables_length select').addClass('form-control');

            fnDatatableCallback(datatable);
        },

        /**
         * Initial date range picker component.
         *
         * @param selector
         */
        init_daterange_picker: function(selector, options) {
            /*Date Range Picker*/
            var cb = function(start, end) {
                    $(selector + ' span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + "]");
                };

            var optionSet1 = {
                startDate: moment().subtract('days', 29),
                endDate: moment(),
                minDate: options.minDate,
                maxDate: options.maxDate,
                dateLimit: {
                    days: 60
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: true,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    'Last 7 Days': [moment().subtract('days', 6), moment()],
                    'Last 30 Days': [moment().subtract('days', 29), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                opens: 'left',
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-small btn-primary',
                cancelClass: 'btn-small',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: 'Submit',
                    cancelLabel: 'Clear',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
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

        /**
         * Initial date selector
         *
         * @param selector, options, view, index
         */
        init_select2: function(selector, options, view, index) {
            var componentSelect2 = require('./view/component-select2');
            var select2_view = (new componentSelect2({
                selector: selector,
                attrs: options
            })).render().promise().done(function(select2_view) {
            	// Fetch select_id
            	var select_id = select2_view.options["selector_id"];

            	// If select_id is not null, then set id to this select and append this selector to its container
                if(select_id) {
                	select2_view.$el.appendTo('#' + select2_view.options["selector_id"] + '-container');
                	select2_view.$el.find('select').attr("id", select2_view.options["selector_id"]);
                }
                // Append this selector to the promised element
                else {
                	select2_view.$el.appendTo(view.$el.children()[index]);
                }

                // Set selector attributes: multiple
            	if(select2_view.options["multiple"] === 'multiple')
            		select2_view.$el.find('select').attr("multiple", "multiple");

				// Setup CSS for this select element
                select2_view.$el.find('select').select2({
	                width: '100%'
	            });
            });
        },

        init_select2_tag: function(selector, options) {
            /*Tags*/
            $(selector).select2({
                tags: 0,
                width: '100%'
            });
        },

        init_slider_range: function(selector, options) {
            /*Slider update range*/
            $(selector).slider().on("slide", function(e) {
                $(options.min_selector).html("¥"+e.value[0]);
                $(options.max_selector).html("¥"+e.value[1]);
            });
        },

        init_switch: function(selector, options) {
            /*Switch*/
            $(selector).bootstrapSwitch();
        },

        init_multi_select: function(selector, options) {
            /*Multi-Select Search*/
            $('selector').multiSelect({
                selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Filter String'>",
                selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Filter String'>",
                afterInit: function(ms) {
                    var that = this,
                        $selectableSearch = that.$selectableUl.prev(),
                        $selectionSearch = that.$selectionUl.prev(),
                        selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                        selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

                    that.qs1 = $selectableSearch.quicksearch(selectableSearchString).on('keydown', function(e) {
                        if (e.which === 40) {
                            that.$selectableUl.focus();
                            return false;
                        }
                    });

                    that.qs2 = $selectionSearch.quicksearch(selectionSearchString).on('keydown', function(e) {
                        if (e.which == 40) {
                            that.$selectionUl.focus();
                            return false;
                        }
                    });
                },
                afterSelect: function() {
                    this.qs1.cache();
                    this.qs2.cache();
                },
                afterDeselect: function() {
                    this.qs1.cache();
                    this.qs2.cache();
                }
            });
        },

        init_touchspine: function(selector, options) {
            $(selector).TouchSpin({
                min: options.min,
                max: options.max,
                stepinterval: options.interval,
                maxboostedstep: 10000000,
                prefix: options.prefix
            });
        }
    };
    module.exports = componentFacade;
});
