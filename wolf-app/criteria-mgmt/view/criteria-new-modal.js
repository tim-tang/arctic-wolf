define(function(require, exports, module) {

    require('modalEffects');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    var criteriaRow = require('./criteria-row');
    
    var eventBus = require('../../app-main/app-eventbus');
    var componentFacade = require('../../common/component-facade');

    var criteriaModal = Backbone.View.extend({
        manage: true,

        model: new criteriaModel(),

		prefix: 'criteria-mgmt/templates/modal/',

        template: 'criteria-new-modal.html',

		criteriaCount: 1,
		
        events: {
            'click #criteria-create-action': 'create_criteria',
            'change #object-type': 'changeObjectType'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.objectType = {
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
			};
			
			eventBus.on('add_criteria_row', this.add_criteria_row, this);
			eventBus.on('remove_criteria_row', this.remove_criteria_row, this);
        },

		changeObjectType: function() {
		    _.each(this.views["#criteria-row-container"], function(view) {
		    	//console.log(view);
			    view.$el.remove();  
		    });
    
			var objType = $("#object-type-container").find('select').val();
           	var criteriaRowView = new criteriaRow({objType: objType});
            this.insertView('#criteria-row-container', criteriaRowView).render();
            
            this.criteriaCount = 1;
		},
        
        afterRender: function() {
            componentFacade.init_switch('.switch');
			componentFacade.init_select2('.select2', this.objectType);
			
			var objType = this.objectType.optgroups[0].options[0].value;
			console.log("objType = "+ objType);
			var criteriaRowView = new criteriaRow({objType: objType});
            this.insertView('#criteria-row-container', criteriaRowView).render();
	    },
        
        add_criteria_row: function() {
			var objType = $("#object-type-container").find('select').val();
			var criteriaRowView = new criteriaRow({objType: objType});
            this.insertView('#criteria-row-container', criteriaRowView).render();
            this.criteriaCount++;
        },
        
        remove_criteria_row: function(view) {
        	if(this.criteriaCount > 1) {
        		view.$el.remove();
        		this.criteriaCount--;
        	}
        },
        
        
        /****************************************************
         * 
         *					About data
         * 
         *****************************************************/
        /*
        serialize: function() {
                    return {
                        criteria: _.clone(this.model.attributes)
                    };
                },*/
                     
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
