define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    require('select2');

    var componentSelect = Backbone.View.extend({

        manage : true,

        prefix : 'app-common/src/tpl/component/',

        template : 'component-select.html',

        initialize : function(options) {
            
            //this.deferred = this.afterRender();
            
            this.options = options;
            
            //var self = this;
            //this.render().promise().done(this.deferred);
        },
        
        render: function() {
            console.log('>>>>>>>>>>>>>>>>>>>>>> beforeRender');
            console.log('>>>>>>>>>>>>>>>>>>>>>> afterRender');
            var selector_type = this.options["selector_type"];
            if (!selector_type || this.options["selector_type"] === 'SELECT2')
                this.makeSelect2();
            else if (self.options["selector_type"] === 'MULTI_SELECT')
                this.makeMultiSelect();
            return this;
        },
                
        afterRender: function() {
            
        },
    
        // Select2
        makeSelect2 : function() {
            var select_id = this.options["selector_id"];

            var _select = this.$el.find('select');
            
            // If select_id is not null, then set id to this select and append this selector to its container
            if (select_id) {
                _select.attr("id", select_id);
            }
            // Append this selector to the promised element
            else {
                this.$el.appendTo(view.$el.children()[index]);
            }

            // Set selector attributes: multiple
            if (this.options["multiple"] === 'multiple')
                _select.attr("multiple", "multiple");

            // Setup CSS for this select element
            _select.select2({
                width : '100%',
                placeholder : "Please select",
                allowClear : true
            });
        },

        makeMultiSelect : function() {
            // Fetch select_id
            var select_id = this.options["selector_id"];

            var _select = this.$el.find('select');
            // If select_id is not null, then set id to this select and append this selector to its container
            if (select_id) {
                var select_container = '#' + multi_select_view.options["container_id"];
                // Remove existing multi selector
                if ($(select_container).children())
                    $(select_container).children().remove();

                this.$el.appendTo(select_container);
                _select.attr("id", select_id);
            }

            // Set selector attributes: multiple
            if (this.options["multiple"] === 'multiple')
                _select.attr("multiple", "multiple");

            // Setup CSS for this select element
            _select.multiSelect({
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
            console.log(options.selected);
            _select.multiSelect('select', options.selected);
        },

        serialize : function() {
            return {
                options : _.clone(this.options)
            };
        }
    });

    module.exports = componentSelect;
});
