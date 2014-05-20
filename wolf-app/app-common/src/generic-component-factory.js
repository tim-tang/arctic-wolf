define(function(require, exports, module) {
    
    var selectView = require('./view/component/component-select');
    
    var genericComponentFactory = {
        
        createComponent : function(options) {
            var component = 'ERROR to create component!';
            var component_type = options['component_type'];
            switch (component_type) {
                case 'SELECT2':
                case 'MULTI_SELECT':
                    component = new selectView(options);
                    break;
            }
            return component;
        },
        
        /*
         * Generate container 'div'
         */
        makeContainer: function(options) {
            return $('div').class(options.class);
        },
        
        /*
         * Generate element 'label'
         */ 
        makeLabel: function(options) {
            return $('label').class(options.class);
        },
        
        /*
         * Generate component 'select2'
         */
        makeSelect2: function() {
            require('select2');
            //TODO: Try to use component factory to populate UI plugins.
        },
        
        /*
         * Generate component 'multi-select'
         */
        makeMultiSelect: function() {
            require('select2');
            //TODO: Try to use component factory to populate UI plugins.
        },
        
        /*
         * Generate component 'input'
         */
        makeInput: function(options) {
            
        },
    };

    module.exports = genericComponentFactory;
});
