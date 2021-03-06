define(function(require, exports, module) {

    var $ = require('$');
    var eventBus = require('app-core').Eventbus;

    var inputView = require('./view/component/component-input');
    var selectView = require('./view/component/component-select');
    var datatableView = require('./view/component/component-datatable');
    var imageUploadView = require('./view/component/component-image-upload');
    var dateTimePickerView = require('./view/component/component-datetime-picker');
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
                case 'TEXTAREA':
                	component = this.makeTextarea(options);
                	break;
                case 'TAGS':
                case 'INPUT':
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
                case 'DATE_TIME_PICKER':
                    component = this.makeDateTimePicker(options);
                    break;
				case 'IMAGE_UPLOAD':
                    component = this.makeImageUpload(options);
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
        	var div = $('<div>');
			if (options['component_id']) div.attr('id', options['component_id']);
            if (options['class']) div.attr('class', options['class']);
            return div;
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
            var _selectView = new selectView(options); 
            _selectView.render().promise().done(function() {
                eventBus.trigger('component-select:renderSelect:' + options["component_id"]);
            });
            return _selectView.$el;
        },

        /*
         * Generate component 'input'
         *
         * Parameter 'options' contain below varibles:
         * - component_type: 'CHECKBOX'
         * .......
         */
        makeInput: function(options) {
            var _inputView = new inputView(options);  
            _inputView.render().promise().done(function() {
                eventBus.trigger('component-input:renderInput:' + options["component_id"]);
            });
            return _inputView.$el;
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
        },
        
        /*
         * Generate component 'DateUploadPicker'
         */
        makeDateTimePicker: function(options) {
            return (new dateTimePickerView(options)).render().promise().done(function() {
                eventBus.trigger('component-datetime-picker:renderDateTimePicker:' + options["component_id"]);
            });
        },
        
        /*
         * Generate component 'ImageUpload'
         */
        makeImageUpload: function(options) {
            return (new imageUploadView(options)).render().promise().done(function() {
                eventBus.trigger('component-image-upload:renderImageUpload:' + options["component_id"]);
            });
        },
        
		/*
         * Generate element 'label'
         *
         * Parameter 'options' contain below varibles:
         * - component_type: 'LABEL'
         * - class: css point to label
         * - text: text point to text of label to display
         */
        makeTextarea: function(options) {
            var textarea = $('<textarea>');
            if (options['component_id']) textarea.attr('id', options['component_id']);
            if (options['text']) textarea.text(options['text']);
            textarea.attr('class', options['class'] ? options['class'] : 'form-control');
            return textarea;
        },

    };

    module.exports = genericComponentFactory;
});
