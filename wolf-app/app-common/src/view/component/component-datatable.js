define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventBus = require('app-core').Eventbus;

    var componentSelect = Backbone.View.extend({

        manage : true,

        prefix : 'app-common/src/tpl/component/',

        template : 'component-datatable.html',

        initialize : function(options) {
            this.options = options;
            eventBus.off('component-datatable:renderDatatable:' + options["component_id"]);
            eventBus.on('component-datatable:renderDatatable:' + options["component_id"], this.renderDatatable, this);
        },

        renderDatatable: function() {
            console.log(">>>>>>>>>>>>>>>>>>>>>>in renderDatatable");
            
            // Fetch datatable_id
            var datatable_id = this.options["datatable_id"];
            var container_id = this.options["container_id"];
            
            var _datatable = this.$el.find('table');
            // If datatable_id is not null, then set id to this datatable
            if (datatable_id) {
                _datatable.attr("id", datatable_id);
            }
            
            if(!container_id)
                container_id = datatable_id + '-container';
            var datatable_container = '#' + container_id;
            // Remove existing datatable
            if ($(datatable_container).children())
                $(datatable_container).children().remove();
            this.$el.appendTo(datatable_container);
            
            var datatable = _datatable.dataTable({
                "aaData": this.options['data'],
                "aoColumns": this.options['header']
            });

            // Search input style
            $('.dataTables_filter input').addClass('form-control').attr('placeholder', 'Search');
            $('.dataTables_length select').addClass('form-control');

            this.options['callback'](datatable);
        },

        serialize : function() {
            return {
                options : _.clone(this.options)
            };
        }
    });

    module.exports = componentSelect;
});
