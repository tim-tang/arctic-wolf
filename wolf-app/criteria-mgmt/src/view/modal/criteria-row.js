define(function(require, exports, module) {

    require('modalEffects');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var criteriaColl = require('../../collection/criteria-coll');
    var criteriaModel = require('../../model/criteria-model');

    var eventBus = require('app-core').Eventbus;
    var componentFactory = require('app-common').GenericComponentFactory;

    var criteriaRow = Backbone.View.extend({
        manage: true,

        model: new criteriaModel(),

		prefix: 'criteria-mgmt/src/tpl/modal/',

        template: 'criteria-row.html',
        
        criteriaRowID: 'criteriaRow',

        events: {
            'change select': 'changeSelectValue',
            'click #add': 'addCriteria',
            'click #remove': 'removeCriteria',
        },

        initialize: function(options) {
            this.criteriaRowID = this.criteriaRowID + this.options.criteriaRowID;
            this.$el.attr('id', this.criteriaRowID);
            
        	this.userAttrs = {
				"component_type" : "SELECT2",
				"container_id" : this.criteriaRowID + " #attributes-container",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "User Name"
							},
							{
								"value": "2",
								"label": "User Description"
							},
							{
								"value": "3",
								"label": "Attribute01"
							}
						]
					},
				]
			};

			this.userGroupAttrs = {
				"component_type" : "SELECT2",
				"container_id" : this.criteriaRowID + " #attributes-container",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "UG Name"
							},
							{
								"value": "2",
								"label": "UG Description"
							},
							{
								"value": "3",
								"label": "Attribute01"
							}
						]
					},
				]
			};

			this.vehicleAttrs = {
				"component_type" : "SELECT2",
				"container_id" : this.criteriaRowID + " #attributes-container",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "Vehicle Name"
							},
							{
								"value": "2",
								"label": "Vehicle Description"
							},
							{
								"value": "3",
								"label": "Attribute01"
							}
						]
					},
				]
			};

			this.operators_0 = {
				"component_type" : "SELECT2",
				"container_id" : this.criteriaRowID + " #operators-container",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "Start with"
							},
							{
								"value": "2",
								"label": "Contains"
							},
							{
								"value": "3",
								"label": "End with"
							}
						]
					},
				]
			};

			this.operators_1 = {
				"component_type" : "SELECT2",
				"container_id" : this.criteriaRowID + " #operators-container",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "Equal to"
							},
							{
								"value": "2",
								"label": "Great than"
							},
							{
								"value": "3",
								"label": "Less than"
							}
						]
					},
				]
			};

			this.operators_2 = {
				"component_type" : "SELECT2",
				"container_id" : this.criteriaRowID + " #operators-container",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "Start with(Date)"
							},
							{
								"value": "2",
								"label": "Contains(Date)"
							},
							{
								"value": "3",
								"label": "End with(Date)"
							}
						]
					},
				]
			};

			this.logicOperators = {
				"component_type" : "SELECT2",
				"container_id" : this.criteriaRowID + " #logic-operators-container",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "AND"
							},
							{
								"value": "2",
								"label": "OR"
							}
						]
					},
				]
			};

			this.objType = this.options.objType;
		},

		afterRender: function() {

        	var attValue = null;
			// Attributes selector
			if (this.objType == '1') {
				componentFactory.makeComponent(this.userAttrs);
				attValue = this.userAttrs.optgroups[0].options[0].value;
			} else if (this.objType == '2') {
				componentFactory.makeComponent(this.userGroupAttrs);
				attValue = this.userGroupAttrs.optgroups[0].options[0].value;
			} else if (this.objType == '3') {
				componentFactory.makeComponent(this.vehicleAttrs);
				attValue = this.vehicleAttrs.optgroups[0].options[0].value;
			}

			// Operator selector
			if (attValue == '1') {
				// Assign operators for String
				componentFactory.makeComponent(this.operators_0);
			} else if (attValue == '2') {
				// Assign operators for Numeric
				componentFactory.makeComponent(this.operators_1);
			} else if (attValue == '3') {
				// Assign operators for Datetime
				componentFactory.makeComponent(this.operators_2);
				// Value input
				//$("#value").remove();
				//$("#value-div").append("<input class='form-control datetime' type='text' value='This is DatePicker' size='8'>");
			}

			componentFactory.makeComponent(this.logicOperators);
       	},

		changeSelectValue: function(select) {
			var containerDivID = select.currentTarget.parentElement.parentElement['id'];
			// Attributes changed
			if(containerDivID === "attributes-container") {
				this.$el.children("#operators-container").children().remove();

				var attValue = select.val;
				if (attValue == '1') {
					// Assign operators for String
					componentFactory.makeComponent(this.operators_0);
				} else if (attValue == '2') {
					// Assign operators for Numeric
					componentFactory.makeComponent(this.operators_1);
				} else if (attValue == '3') {
					// Assign operators for Datetime
					componentFactory.makeComponent(this.operators_2);
					// Value input
					//$("#value").remove();
					//$("#value-div").append("<input class='form-control datetime' type='text' value='This is DatePicker' size='8'>");
				}
			}
			// Operators changed
			else if(containerDivID === "operators-container") {

			}
			// Logic Operators changed
			else if(containerDivID === "logic-operators-container") {
				//eventBus.trigger('add_criteria_row');
			}
		},

		addCriteria: function(event) {
            if (event) event.preventDefault();
			eventBus.trigger('add_criteria_row');
		},

		removeCriteria: function(event) {
            if (event) event.preventDefault();
			eventBus.trigger('remove_criteria_row', this);
		}
    });

    module.exports = criteriaRow;
});
