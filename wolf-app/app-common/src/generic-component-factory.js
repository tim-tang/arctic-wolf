define(function(require, exports, module) {

    var $ = require('$');
    var eventBus = require('app-core').Eventbus;

    var inputView = require('./view/component/component-input');
    var selectView = require('./view/component/component-select');
    var datatableView = require('./view/component/component-datatable');
    var dateRangePickerView = require('./view/component/component-daterange-picker');

    var genericComponentFactory = {

        makeBulkComponent : function(componets) {
            var self = this;
            _.each(componets, function(component) {
                self.makeComponent(component);
            });
        },

        makeComponent : function(options) {
            var component = 'ERROR to create component!';
            var component_type = options['component_type'];
            switch (component_type) {
                case 'CONTAINER':
                    component = this.makeContainer(options);
                    break;
                case 'LABEL':
                    component = this.makeLabel(options);
                    break;
                case 'TEXT':
                    component = this.makePlainText(options);
                    break;
                case 'SELECT2':
                case 'MULTI_SELECT':
                    component = this.makeSelect(options);
                    break;
                case 'TAGS':
                case 'CHECKBOX':
                case 'SLIDE_RANGE':
                case 'TOUCH_SPINE':
                    component = this.makeInput(options);
                    break;
                case 'DATATABLE':
                    component = this.makeDatatable(options);
                    break;
                case 'DATE_RANGE_PICKER':
                    component = this.makeDateRangePicker(options);
                    break;
            }
            return component;
        },

        /*
         * Generate container 'div'
         *
         * Parameter 'options' contain below varibles:
         * - component_type: 'CONTAINER'
         * - class: css point to div
         */
        makeContainer: function(options) {
            if(options['class']) return $('<div>').attr('class', options['class']);
        },

        /*
         * Generate element 'label'
         *
         * Parameter 'options' contain below varibles:
         * - component_type: 'LABEL'
         * - class: css point to label
         * - text: text point to text of label to display
         */
        makeLabel: function(options) {
            var label = $('<label>');
            if(options['class']) label.attr('class', options['class']);
            if(options['text']) label.text(options['text']);
            return label;
        },

        /*
         * Generate element 'plain text'
         *
         * Parameter 'options' contain below varibles:
         * - component_type: 'TEXT'
         * - class: css point to text
         * - style: css point to text
         * - text: text to display
         */
        makePlainText: function(options) {
            var text = $('<p>');
            if(options['class']) text.attr('class', options['class']);
            if(options['style']) text.attr('style', options['style']);
            if(options['text']) text.text(options['text']);
            return text;
        },

        /*
         * Generate component 'select'
         *
         * Parameter 'options' contain below varibles:
         * - component_type: 'SELECT2' or 'MULTI_SELECT'
         * - component_id: id of select, ie - 'privileges'
         * - container_id: container of select, if not specified, just return $el,
         *                 and it requires be located, ie - 'assign-obj-container'
         * - multiple: multiple attribute of select
         * - selected: default selected items, no default items goes with []
         * - optgroups: optgroups of select, at least one optgroup required
         */
        makeSelect: function(options) {
            return (new selectView(options)).render().promise().done(function() {
                eventBus.trigger('component-select:renderSelect:' + options["component_id"]);
            });
        },

        /*
         * Generate component 'input'
         *
         * Parameter 'options' contain below varibles:
         * - component_type: 'CHECKBOX'
         * .......
         */
        makeInput: function(options) {
            return (new inputView(options)).render().promise().done(function() {
                eventBus.trigger('component-input:renderInput:' + options["component_id"]);
            });
        },

        /*
         * Generate component 'datatable'
         *
         * Parameter 'options' contain below varibles:
         * - component_type: 'DATATABLE'
         * - datatable_id: id of datatable, ie - 'obj-mgmt-datatable'
         * - container_id: container of datatable, if not specified, just return $el,
         *                 and it requires be located, ie - 'obj-mgmt-datatable-div'
         * - data: data which will be polulated into datatable
         * - header: header defined to datatable
         * - callback: callback function
         */
        makeDatatable: function(options) {
        	return (new datatableView(options)).render().promise().done(function() {
                eventBus.trigger('component-datatable:renderDatatable:' + options["component_id"]);
            });
        },

        /*
         * Generate component 'DateRangePicker'
         */
        makeDateRangePicker: function(options) {
            return (new dateRangePickerView(options)).render().promise().done(function() {
                eventBus.trigger('component-daterange-picker:renderDateRangePicker:' + options["component_id"]);
            });
        }
    };

    module.exports = genericComponentFactory;
});