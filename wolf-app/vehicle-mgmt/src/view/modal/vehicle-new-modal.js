define(function(require, exports, module) {


	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var vehicleModel = require('../../model/vehicle-model');
	var vehicleColl = require('../../collection/vehicle-coll');

	var componentFactory = require('app-common').GenericComponentFactory;

	var vehicleModal = Backbone.View.extend({
		manage : true,
		model : new vehicleModel(),

		prefix : "vehicle-mgmt/src/tpl/modal/",
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
				"component_type" : "TOUCH_SPINE",
				"component_id" : "vehicle-price",
				"options" : {
					'min' : 1,
					'max' : 1000000,
					'interval' : 1,
					'prefix' : '$'
				}
			});

			var vehicleBrands = {
				"component_type" : "SELECT2",
				"component_id" : "vehicle-brands",
				"optgroups" : [{
					"label" : "Benz",
					"options" : [{
						"value" : "s600",
						"label" : "S600"
					}, {
						"value" : "s60",
						"label" : "s600"
					}]
				}]
			};
			componentFactory.makeComponent(vehicleBrands);

			var vehicleModels = {
				"component_type" : "SELECT2",
				"component_id" : "vehicle-models",
				"optgroups" : [{
					"label" : "S600",
					"options" : [{
						"value" : "s600",
						"label" : "S600"
					}]
				}]
			};
			componentFactory.makeComponent(vehicleModels);

			var emissions = {
				"component_type" : "SELECT2",
				"component_id" : "vehicle-emissions",
				"optgroups" : [{
					"options" : [{
						"value" : "1",
						"label" : "国一"
					}, {
						"value" : "2",
						"label" : "国二"
					}, {
						"value" : "3",
						"label" : "国三"
					}, {
						"value" : "4",
						"label" : "国四"
					}, {
						"value" : "5",
						"label" : "国五"
					}]
				}]
			};
			componentFactory.makeComponent(emissions);

			var statusSwitch = {
				"component_type" : "CHECKBOX",
				"component_id" : "vehicle-switch"
			};
			componentFactory.makeComponent(statusSwitch);

			var onBoardDate = {
				"component_type" : "DATE_TIME_PICKER",
				"component_id" : "on-board-date"
			};
			componentFactory.makeComponent(onBoardDate);

			var imageUpload = {
				"component_type" : "IMAGE_UPLOAD",
				"component_id" : "image-upload"
			};
			componentFactory.makeComponent(imageUpload);
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
