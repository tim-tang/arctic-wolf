define(function(require, exports, module) {

    // - Import dependency css
    require('css-bt-datetime-picker');
    require('css-select2');
    require('css-slider');
    require('css-daterangepicker');
    require('css-component');
    require('css-general');

    // - Import dependency js
    var $ = require('$');
    require('moment');
    require('daterangepicker');
    require('datetimepicker');
    require('bootstrap-slider');
    require('modalEffects');

    var common = require('../common/common');

    module.exports = {
        ready_product_search: function() {
            /*Date Range Picker*/
            var cb = function(start, end) {
                    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + "]");
                };

            var optionSet1 = {
                startDate: moment().subtract('days', 29),
                endDate: moment(),
                minDate: '01/01/2012',
                maxDate: '12/31/2014',
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

            $('#reportrange span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            $('#reportrange').daterangepicker(optionSet1, cb);
            $('#reportrange').on('show', function() {
                console.log("show event fired");
            });
            $('#reportrange').on('hide', function() {
                console.log("hide event fired");
            });
            $('#reportrange').on('apply', function(ev, picker) {
                console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
            });

            $('#reportrange').on('cancel', function(ev, picker) {
                console.log("cancel event fired");
            });

            /*Select2*/
            common.init_select2();
            common.init_select2_tag();

            /*Slider update range*/
            $("#price-range").slider().on("slide", function(e) {
                $("#price1").html("$" + e.value[0]);
                $("#price2").html("$" + e.value[1]);
            });

        }
    };
});
