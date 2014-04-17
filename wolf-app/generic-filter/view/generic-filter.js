define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');

    var componentFacade = require('../../common/component-facade');
    var genericFilter = Backbone.View.extend({

        manage: true,
        prefix: "generic-filter/tpl/",
        template: 'generic-filter.html',

        initialize: function(){
            //TODO:
        },

        afterRender: function(){
            componentFacade.init_daterange_picker('#reportrange');
            componentFacade.init_select2('.select2');
            componentFacade.init_select2_tag('.tags');
            componentFacade.init_slider_range('#price-range', {min: '#price1', max: '#price2'})
        }
    });

    module.exports = genericFilter;

});
