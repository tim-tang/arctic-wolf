define(function(require, exports, module) {

    require('modalEffects');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    var criteriaRow = require('./criteria-row');
    
    var componentFacade = require('../../common/component-facade');

    var criteriaModal = Backbone.View.extend({
        manage: true,

        model: new criteriaModel(),

		prefix: 'criteria-mgmt/templates/modal/',

        template: 'criteria-new-modal.html',

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
        },

		changeObjectType: function() {
			// this.remove();
		    // this.unbind();
		    // handle other unbinding needs, here
		    _.each(this.views, function(view) {
		    	console.log(view);
				//view.remove();
			    view.$el.remove();  
			    //Backbone.View.prototype.remove.call(view);
		    });
    
			var objType = $("#object-type-container").find('select').val();
			console.log("changeObjectType > objType = " + objType);

           	var criteriaRowView = new criteriaRow({objType: objType});
            this.insertView('#criteria-row-container', criteriaRowView).render();
		},
		
        /*
        serialize: function() {
                    return {
                        criteria: _.clone(this.model.attributes)
                    };
                },*/
        
        afterRender: function() {
            componentFacade.init_switch('.switch');
			componentFacade.init_select2('.select2', this.objectType);
			
			var objType = this.objectType.optgroups[0].options[0].value;
			console.log("objType = "+ objType);
			var criteriaRowView = new criteriaRow({objType: objType});
            this.insertView('#criteria-row-container', criteriaRowView).render();
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
