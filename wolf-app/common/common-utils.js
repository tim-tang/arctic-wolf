/*
 *
 * Common functions are defined and exported here
 *
 */
define(function(require, exports, module) {

    var $ = require('$');

    require('jquery-datatables');
    require('datatables');
    require('jasny');
    require('select2');
    require('switch');
    require('multi-select');

    module.exports = {

        generate_datatable: function(header, data, datatable_id, fnDatatableCallback) {
            var datatable_div = datatable_id + '-div';
            $("#" + datatable_div).html('<table class="table table-bordered" id="' + datatable_id + '"></table>');
            datatable_id = "#" + datatable_id;

            // console.log(JSON.stringify(header));
            // console.log(JSON.stringify(data));

            /* Init the table with dynamic ajax loader.*/
            var datatable = $(datatable_id).dataTable({
                "aaData": data,
    			"aoColumns": header
            });

            // Search input style
            $('.dataTables_filter input').addClass('form-control').attr('placeholder', 'Search');
            $('.dataTables_length select').addClass('form-control');

			fnDatatableCallback(datatable);
        },

        remove_selected_row: function(datatable) {
            var selected_rows = datatable.$('tr.row_selected');
            selected_rows.each(function(index, row) {
                datatable.fnDeleteRow(row);
            });
        },

        init_select2: function() {
            $(".select2").select2({
                width: '100%'
            });
        },

        init_select2_tag: function() {
            /*Tags*/
            $(".tags").select2({
                tags: 0,
                width: '100%'
            });
        },

        init_switch: function() {
            /*Switch*/
            $('.switch').bootstrapSwitch();
        },

        init_multi_select: function() {
            /*Multi-Select Search*/
            $('.searchable').multiSelect({
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
        
        // Reset form
        // to call, use:
		// resetForm($('#myform')); // by id, recommended
		// resetForm($('form[name=myName]')); // by name
        resetForm: function($form) {
		    $form.find('input:text, input:password, input:file, select, textarea').val('');
		    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
		}
    };
});
