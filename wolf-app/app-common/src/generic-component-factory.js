define(function(require, exports, module) {
    
    var $ = require('$');
    var eventBus = require('app-core').Eventbus;
    
    var selectView = require('./view/component/component-select');
        
    var genericComponentFactory = {
        
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
                case 'SELECT2':
                case 'MULTI_SELECT':
                    component = this.makeSelect(options);
                    break;
                case 'CHECKBOX':
                    component = this.makeInput(options);
                    break;
            }
            return component;
        },
        
        /*
         * Generate container 'div'
         */
        makeContainer: function(options) {
            return $('<div>').attr('class', options['class']);
        },
        
        /*
         * Generate element 'label'
         */ 
        makeLabel: function(options) {
            return $('<label>').attr('class', options['class']).text(options['text']);
        },
        
        /*
         * Generate component 'select'
         */
        makeSelect: function(options) {
            var _selectView = new selectView(options);
            _selectView.render().promise().done(function() {
                eventBus.trigger('component-select:renderComponent');
            });
            return _selectView.$el;
        },
        
        /*
         * Generate component 'input'
         */
        makeInput: function(options) {
            var component_type = options['component_type'];
            var inputView = null;
            if(component_type === 'CHECKBOX') {
                inputView = this.makeContainer({'class':'switch'}).append($('<input>').attr('type', 'checkbox')).bootstrapSwitch();;
            }
            return inputView;
        },
        
        /*
         * Generate component 'datatable'
         */
        makeDatatable: function(options) {
            
        },
        
        /*
         * Generate component 'DateRangePicker'
         */
        makeDateRangePicker: function(options) {
            
        },
        
        /*
         * Generate component 'Select2Tag'
         */
        makeSelect2Tag: function(options) {
            
        },
        
        /*
         * Generate component 'SliderRange'
         */
        makeSliderRange: function(options) {
            
        },
        
        /*
         * Generate component 'touchspine'
         */
        makeTouchspine: function(options) {
            
        },
    };

    module.exports = genericComponentFactory;
});
