define(function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var eventBus = require('../../app-main/app-eventbus');

    var componentFacade = require('../../common/component-facade');
    var genericFilterColl = require('../collection/generic-filter-coll');
    var genericFilter = Backbone.View.extend({

        manage: true,
        prefix: "generic-filter/tpl/",
        template: 'generic-filter.html',

        initialize: function(){
            this.listenTo(genericFilterColl, 'request',this.show_loading);
            this.listenTo(genericFilterColl, 'sync', this.hide_loading);
        },

        show_loading: function(){
            eventBus.trigger('show-loading');
        },

        hide_loading: function(){
            eventBus.trigger('hide-loading');
        },

        afterRender: function(){
            genericFilterColl.fetch();
            //componentFacade.init_daterange_picker('#reportrange');
            //componentFacade.init_select2('.select2');
            //componentFacade.init_select2_tag('.tags');
            //componentFacade.init_slider_range('#price-range', {min: '#price1', max: '#price2'})
        }
    });

    module.exports = genericFilter;

});
