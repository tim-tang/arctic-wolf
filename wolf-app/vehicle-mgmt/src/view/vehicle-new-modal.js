define(function(require, exports, module) {

    require('modalEffects');
    require('bt-touchspin');
    require('select2');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var vehicleModel = require('../model/vehicle-model');
    var vehicleColl = require('../collection/vehicle-coll');
    
    var componentFactory = require('app-common').GenericComponentFactory;

    var vehicleModal = Backbone.View.extend({
        manage : true,
        model : new vehicleModel(),

        prefix : "vehicle-mgmt/src/tpl/",
        template : 'vehicle-new-modal.html',

        events : {
            'click #vehicle-create-action' : 'create_vehicle'
        },

        initialize : function() {
            //this.listenTo(this.model, 'change', this.test);
        },

        serialize : function() {
            return {
                vehicle : _.clone(this.model.attributes)
            };
        },

        afterRender : function() {
            componentFactory.makeComponent({
                "component_type":"TOUCH_SPINE",
                "component_id":"vehicle-price",
                "options":{
                    'min' : 1,
                    'max' : 1000000,
                    'interval' : 1,
                    'prefix' : '$'
                 }
            });
            $(".select2").select2({
                width : '100%'
            });
        },

        new_attributes : function() {
            return {
                vehicle_name : this.$('#vehicle-name').val().trim(),
                vehicle_price : this.$('#vehicle-price').val().trim(),
                vehicle_desc : this.$('#vehicle-desc').val().trim()
            };
        },

        /**
         * Handling vehicle instance creation.
         */
        create_vehicle : function() {
            vehicleColl.create(this.new_attributes());
        }
    });

    module.exports = vehicleModal;
});
