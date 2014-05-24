define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var componentFactory = require('./generic-component-factory');

    var genericLayoutFactory = {

        makeLayout : function(options) {
            var layout = null;
            var layout_type = options['layout_type'];
            switch (layout_type) {
                case '2_COLUMNS':
                    layout = this.make2ColumnsLayout(options);
                    break;
            }
            return layout;
        },

        /*
         * Make 2 columns layout, which used to diplay attributes and their values in 2 columns
         * Left is attribute name, right part is the value of attribute
         * CSS structure:
         * 'form-group'
         *     |--'col-sm-3 control-label'  'col-sm-6'
         *                  |                   |
         *              Left Part           Right Part
         *
         * Parameter 'options' contain below varibles:
         * - container : container of 2Columns layout, ie: pageForm
         * - layout_type : which indicator which kind of layout, ie: '2_COLUMNS'
         * - attrs : all attributes which expceted to display, ie: mock_attr
         * - model : value of attributes, ie: this.model
         */
        make2ColumnsLayout : function(options) {
            var container = options['container'];
            var self = this;
            _.each(options['attrs'], function(attr) {
                // Attirbute line container
                var attr_line_container = componentFactory.makeComponent({
                    'component_type' : 'CONTAINER',
                    'class' : 'form-group'
                });
                // Attribute value/component container
                var attr_right_col_container = componentFactory.makeComponent({
                    'component_type' : 'CONTAINER',
                    'class' : 'col-sm-6'
                });
                // Left: Attribute name
                attr_line_container.append(componentFactory.makeComponent({
                    'component_type' : 'LABEL',
                    'class' : 'col-sm-3 control-label',
                    'text' : attr['desc']
                }));
                // Right: Attribute value/component
                if (attr['type'] === 'text')
                    attr_line_container.append(attr_right_col_container.append(componentFactory.makeComponent({
                        'component_type' : 'TEXT',
                        'class' : 'control-label',
                        'style' : 'text-align:left',
                        'text' : options['model'].get(attr['name'])
                    })));
                else if (attr['type'] === 'input')
                    attr_line_container.append(attr_right_col_container.append(componentFactory.makeComponent({
                        'component_type' : 'CHECKBOX'
	                })));
                // Append to constainer
                container.append(attr_line_container);
            });
            return container;
        },
    };
    module.exports = genericLayoutFactory;
});
