define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;

    require('select2');

    var componentSelect = Backbone.View.extend({

        manage : true,

        prefix : 'app-common/src/tpl/component/',

        template : 'component-select.html',

        initialize : function(options) {
            this.options = options;
            eventBus.off('component-select:renderSelect');
            eventBus.on('component-select:renderSelect', this.renderSelect, this);
        },

        renderSelect: function() {
            console.log(">>>>>>>>>>>>>>>>>>>>>>in renderSelect");
            var selector_type = this.options["component_type"];
            
            // Fetch select_id
            var select_id = this.options["select_id"];
            var multiple = this.options["multiple"];
            var container_id = this.options["container_id"];

            var _select = this.$el.find('select');
            
            // If select_id is not null, then set id to this select
            if (select_id) {
                _select.attr("id", select_id);
            }
            
            // If select_id is not null, then set id to this select
            if (multiple && multiple === 'multiple')
                _select.attr("multiple", "multiple");
                
            // If container_id is not null, then append this selector to its container
            if(container_id) {
                var select_container = '#' + container_id;
                // Remove existing multi selector
                if ($(select_container).children())
                    $(select_container).children().remove();

                this.$el.appendTo(select_container);
            }
            
            if (!selector_type || selector_type === 'SELECT2')
                this.makeSelect2(_select);
            else if (selector_type === 'MULTI_SELECT')
                this.makeMultiSelect(_select);
        },
            
        // Select2
        makeSelect2 : function(select) {
            // Set CSS
            select.attr('class', 'select2');
            
            // Setup CSS for this select element
            select.select2({
                width : '100%',
                placeholder : "Please select",
                allowClear : true
            });
        },

        makeMultiSelect : function(select) {
			// Set CSS
            select.attr('class', 'searchable');
            
            // Setup CSS for this select element
            select.multiSelect({
                selectableOptgroup : true,
                selectableHeader : "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Filter String'>",
                selectionHeader : "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Filter String'>",
                afterInit : function(ms) {
                    var that = this, $selectableSearch = that.$selectableUl.prev(), $selectionSearch = that.$selectionUl.prev(), selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)', selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

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
                afterSelect : function() {
                    this.qs1.cache();
                    this.qs2.cache();
                },
                afterDeselect : function() {
                    this.qs1.cache();
                    this.qs2.cache();
                }
            });

            // Set default options
            console.log(this.options.selected);
            select.multiSelect('select', this.options.selected);
        },

        serialize : function() {
            return {
                options : _.clone(this.options)
            };
        }
    });

    module.exports = componentSelect;
});
