define(function(require, exports, module) {

    require('modalEffects');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    
    var eventBus = require('../../app-main/app-eventbus');
    var componentFacade = require('../../common/component-facade');

    var criteriaRow = Backbone.View.extend({
        manage: true,

        model: new criteriaModel(),
        
		prefix: 'criteria-mgmt/templates/modal/',

        template: 'criteria-row.html',
        
        criteriaCount: 1,

        events: {
            'change select': 'changeSelectValue',
            'click #add': 'addCriteria',
            'click #remove': 'removeCriteria',
        },

        initialize: function(options) {
        	
        	this.userAttrs = {
				//"selector_id": "attributes",
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
				//"selector_id": "attributes",
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
				//"selector_id": "attributes",
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
				//"selector_id": "operators",
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
				//"selector_id": "operators",
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
				//"selector_id": "operators",
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
			
			this.objType = this.options.objType;	
		},

		afterRender: function() {
        	
        	var attValue = null;
			// Attributes selector
			if (this.objType == '1') {
				componentFacade.init_select2('.select2', this.userAttrs, this, 0);
				attValue = this.userAttrs.optgroups[0].options[0].value;
			} else if (this.objType == '2') {
				componentFacade.init_select2('.select2', this.userGroupAttrs, this, 0);
				attValue = this.userGroupAttrs.optgroups[0].options[0].value;
			} else if (this.objType == '3') {
				componentFacade.init_select2('.select2', this.vehicleAttrs, this, 0);
				attValue = this.vehicleAttrs.optgroups[0].options[0].value;
			}

			console.log("attValue = "+ attValue);
			// Operator selector
			if (attValue == '1') {
				// Assign operators for String
				componentFacade.init_select2('.select2', this.operators_0, this, 1);
			} else if (attValue == '2') {
				// Assign operators for Numeric
				componentFacade.init_select2('.select2', this.operators_1, this, 1);
			} else if (attValue == '3') {
				// Assign operators for Datetime
				componentFacade.init_select2('.select2', this.operators_2, this, 1);
				// Value input
				//$("#value").remove();
				//$("#value-div").append("<input class='form-control datetime' type='text' value='This is DatePicker' size='8'>");
			}			
       	},
		
		changeSelectValue: function(select) {
			var containerDivID = select.currentTarget.parentElement.parentElement['id'];
			// Attributes changed
			if(containerDivID === "attributes-container") {
				this.$el.children("#operators-container").children().remove();
			
				// Clear operator selector
				$("#operators").empty();
	
				var attValue = select.val;
				if (attValue == '1') {
					// Assign operators for String
					componentFacade.init_select2('.select2', this.operators_0, this, 1);
				} else if (attValue == '2') {
					// Assign operators for Numeric
					componentFacade.init_select2('.select2', this.operators_1, this, 1);
				} else if (attValue == '3') {
					// Assign operators for Datetime
					componentFacade.init_select2('.select2', this.operators_2, this, 1);
					// Value input
					//$("#value").remove();
					//$("#value-div").append("<input class='form-control datetime' type='text' value='This is DatePicker' size='8'>");
				}
			}
			// Operators changed
			else if(containerDivID === "operators-container") {
				
			}
		},
		
		addCriteria: function() {
			this.criteriaCount++;
			eventBus.trigger('add_criteria_row');
		},
		
		removeCriteria: function() {
			if (this.criteriaCount > 1) {
				this.$el.remove();
				this.criteriaCount--;
			}
		}
    });

    module.exports = criteriaRow;
});
