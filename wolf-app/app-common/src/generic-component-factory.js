define(function(require, exports, module) {

    var genericComponentFactory = {

        /**
         * Make select2 component.
         *
         */
        makeSlect2: function(){
            require('select2');
            //TODO: Try to use component factory to populate UI plugins.

        }
    };

    module.exports = genericComponentFactory;
});
