 define(function(require, exports, module) {
     require('bt-touchspin');

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var vehicleColl = require('../collection/vehicle-coll');
     var vehicleHeaderColl = require('../collection/vehicle-header-coll');
     var vehicleModel = require('../model/vehicle-model');
     var common = require('../../common/common');
     var datatable;

     var vehicleView = Backbone.View.extend({
         el: '#vehicle-new-modal',

         model: new vehicleModel(),

         template: _.template($('#vehicle-template').html()),

         events: {
             'click #vehicle-create-action': 'create_vehicle'
         },

         initialize: function() {
             this.listenTo(this.model, 'change', this.test);
         },

         test: function(){
            alert('3333');
         },

         render: function() {
             this.$el.html(this.template(this.model.toJSON()));
            common.init_select2();
            // register touch spin
             $("#vehicle-price").TouchSpin({
                min: -1000000000,
                max: 1000000000,
                stepinterval: 8,
                maxboostedstep: 10000000,
                prefix: '$'
             });
             return this;
         },

         new_attributes: function(){
            return {
                vehicle_name : this.$('#vehicle-name').val().trim(),
                vehicle_price: this.$('#vehicle-price').val().trim(),
                vehicle_desc : this.$('#vehicle-desc').val().trim()
            }
         },

        /**
         * Handling vehicle instance creation.
         */
         create_vehicle: function() {
             vehicleColl.create(this.new_attributes());
         }
     });

     module.exports = new vehicleView();
 });
