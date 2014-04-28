define(function(require, exports, module) {

    require('modalEffects');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    
    var componentFacade = require('../../common/component-facade');

    var criteriaRow = Backbone.View.extend({
        manage: true,

        model: new criteriaModel(),
        
		prefix: 'criteria-mgmt/templates/modal/',

        template: 'criteria-row.html',
        
        criteriaCount: 1,

        events: {
            'change #attributes': 'changeObjectAttr',
            'click #add': 'addCriteria',
            'click #remove': 'removeCriteria',
        },

        initialize: function(options) {
        	
        	this.userAttrs = {
				"selector_id": "attributes",
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
				"selector_id": "attributes",
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
				"selector_id": "attributes",
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
				"selector_id": "operators",
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
				"selector_id": "operators",
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
				"selector_id": "operators",
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
				console.log(">>>>>>>>>>>>>>>>>>"+ this.objType);
				componentFacade.init_select2('.select2', this.userAttrs);
				attValue = this.userAttrs.optgroups[0].options[0].value;
			} else if (this.objType == '2') {
				componentFacade.init_select2('.select2', this.userGroupAttrs);
				attValue = this.userGroupAttrs.optgroups[0].options[0].value;
			} else if (this.objType == '3') {
				componentFacade.init_select2('.select2', this.vehicleAttrs);
				attValue = this.vehicleAttrs.optgroups[0].options[0].value;
			}

			console.log("attValue = "+ attValue);
			// Operator selector
			if (attValue == '1') {
				// Assign operators for String
				componentFacade.init_select2('.select2', this.operators_0);
			} else if (attValue == '2') {
				// Assign operators for Numeric
				componentFacade.init_select2('.select2', this.operators_1);
			} else if (attValue == '3') {
				// Assign operators for Datetime
				componentFacade.init_select2('.select2', this.operators_2);
				// Value input
				//$("#value").remove();
				//$("#value-div").append("<input class='form-control datetime' type='text' value='This is DatePicker' size='8'>");
			}			
       	},
		
		changeObjectAttr: function() {
			this.$el.children("#operators-container").children().remove();
			
			// Clear operator selector
			$("#operators").empty();

			var attValue = $("#attributes").val();
			if (attValue == '1') {
				// Assign operators for String
				componentFacade.init_select2('.select2', this.operators_0);
			} else if (attValue == '2') {
				// Assign operators for Numeric
				componentFacade.init_select2('.select2', this.operators_1);
			} else if (attValue == '3') {
				// Assign operators for Datetime
				componentFacade.init_select2('.select2', this.operators_2);
				// Value input
				$("#value").remove();
				$("#value-div").append("<input class='form-control datetime' type='text' value='This is DatePicker' size='8'>");
			}
		},
		
		addCriteria: function() {
			this.criteriaCount++;

			var criteriaRowView = new criteriaRow({objType: this.objType});
            this.insertView('#criteria-row-container', criteriaRowView).render();
		},
		
		removeCriteria: function() {
			//alert(criteriaCount);
			if (this.criteriaCount > 1) {
				this.$el.remove();
				this.criteriaCount--;
			}
		}
    });

    module.exports = criteriaRow;
});
