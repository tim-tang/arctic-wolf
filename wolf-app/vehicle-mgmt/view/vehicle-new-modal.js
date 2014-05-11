 define(function(require, exports, module) {

     require('modalEffects');
     require('bt-touchspin');

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var vehicleColl = require('../collection/vehicle-coll');
     var vehicleModel = require('../model/vehicle-model');
     var componentFacade = require('app-common').ComponentFacade;

     var vehicleModal = Backbone.View.extend({
         manage: true,
         model: new vehicleModel(),

         prefix: "vehicle-mgmt/templates/",
         template: 'vehicle-new-modal.html',

         events: {
             'click #vehicle-create-action': 'create_vehicle'
         },

         initialize: function() {
             //this.listenTo(this.model, 'change', this.test);
         },


         serialize: function() {
            return { vehicle: _.clone(this.model.attributes) };
         },

         afterRender: function() {
           componentFacade.init_touchspine('#vehicle-price', {min: 1, max: 1000000, interval: 1, prefix: '$'});
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

     module.exports = vehicleModal;
 });
