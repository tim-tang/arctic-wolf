define(function(require, exports, module) {

    require('modalEffects');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    
    var componentFacade = require('../../common/component-facade');

    var criteriaModal = Backbone.View.extend({
        manage: true,

        model: new criteriaModel(),

		prefix: 'criteria-mgmt/templates/modal/',

        template: 'criteria-new-modal.html',

        events: {
            'click #criteria-create-action': 'create_criteria',
            'change .select2': 'changeObjectType'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            objectType = {
				"selector_id": "object-type",
				"optgroups": [
					{
						"options": [
							{
								"value": "1", 
								"label": "User"
							},
							{
								"value": "2", 
								"label": "UserGroup"
							},
							{
								"value": "3", 
								"label": "Vehicle"
							}
						]
					},
				]
			},
			
			userAttrs = {
				"selector_id": "attrs",
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
			},
			
			userGroupAttrs = {
				"selector_id": "attrs",
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
			},
			
			vehicleAttrs = {
				"selector_id": "attrs",
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
			},
			
			dump = null;
        },

		changeObjectType: function() {
			
			var objType = $("#object-type-container").find('select').val();

            if(objType == '1') {
				componentFacade.init_select2('.select2', userAttrs);
            } else if(objType == '2') {
				componentFacade.init_select2('.select2', userGroupAttrs);
            } else if(objType == '3') {
				componentFacade.init_select2('.select2', vehicleAttrs);
            }
		},
		
        /*
        serialize: function() {
                    return {
                        criteria: _.clone(this.model.attributes)
                    };
                },*/
        
        afterRender: function() {
            componentFacade.init_switch('.switch');
			componentFacade.init_select2('.select2', objectType);

			componentFacade.init_select2('.select2', userAttrs);

            $("#attrs").change(function(e) {

                // Clear operator selector
                $("#operator").empty();

                var attrVal = $("#attrs").val();
                if(attrVal == 'vehicle_name') {
                    // Assign operators for String
                    $("#operator").append("<option value='start_with'>Start with</option>");
                    $("#operator").append("<option value='contain'>Contains</option>");
                    $("#operator").append("<option value='end_with'>End with</option>");
                } else if(attrVal == 'vehicle_price') {
                    // Assign operators for Numeric
                    $("#operator").append("<option value='equal_to'>Equal to</option>");
                    $("#operator").append("<option value='great_than'>Great than</option>");
                    $("#operator").append("<option value='less_than'>Less than</option>");
                } else if(attrVal == 'vehicle_desc') {
                    // Assign operators for Datetime
                    $("#operator").append("<option value='equal_to'>Equal to(Date)</option>");
                    $("#operator").append("<option value='great_than'>Great than(Date)</option>");
                    $("#operator").append("<option value='less_than'>Less than(Date)</option>");
                    // Value input
                    $("#value").remove();
                    $("#value-div").append("<input class='form-control datetime' type='text' value='This is DatePicker' size='8'>");
                }
            });
			
			// Add/Delete one Criteria
            var criteriaCount = 0;
            // Add button functionality
            $("#criteriaTable").on("click", "table.table a.add", function() {
                criteriaCount++;
                var master = $(this).parents("table.table");
                // Get a new row based on the prototype row
                var newCriteria = master.find("tr").last().clone();
                newCriteria.attr("class", "");
                newCriteria.find("#value").attr("value", criteriaCount);

                master.find("tbody").append(newCriteria);
            });

            // Remove button functionality
            $("#criteriaTable").on("click", "table.table a.remove", function() {
                //alert(criteriaCount);
                if(criteriaCount >= 1) {
                    $(this).parents("tr").remove();
                    criteriaCount--;
                }
            });
        },

        new_attributes: function() {
            return {
                cri_name: this.$('#cri-name').val().trim(),
                cri_desc: this.$('#cri-desc').val().trim(),
                obj_type: this.$('#object-type').val().trim(),
                enabled: this.$('#enabled').val().trim() === 'on' ? 'Yes' : 'No'
            }
        },

        /**
         * Handling criteria instance creation.
         */
        create_criteria: function() {
        	// console.log(JSON.stringify(this.new_attributes()));
            criteriaColl.create(this.new_attributes());
            // criteriaColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
        }
    });

    module.exports = criteriaModal;
});
