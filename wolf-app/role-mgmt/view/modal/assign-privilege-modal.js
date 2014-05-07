define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var roleColl = require('../../collection/role-coll');
    var roleModel = require('../../model/role-model');

	var eventBus = require('../../../app-main/app-eventbus');
	var componentFacade = require('../../../common/component-facade');

    var assignPrivilegeModal = Backbone.View.extend({
        manage: true,

        model: new roleModel(),

        prefix: 'role-mgmt/templates/modal/',

        template: 'assign-privilege-modal.html',

		privileges: null, 
		
        events: {
            'click #role-create-action': 'create_role'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.privileges = {
				"selector_id": "privileges",
				"multiple": "multiple",
				"optgroups": [
					{
						"label": "Read",
						"options": [
							{
								"value": "1", 
								"label": "Read User",
								"selected": "true"
							},
							{
								"value": "2", 
								"label": "Read Vehicle",
								"selected": "false"
							}
						]
					},
					{
						"label": "Create",
						"options": [
							{
								"value": "3", 
								"label": "Create User",
								"selected": "true"
							},
							{
								"value": "4", 
								"label": "Create Vehicle",
								"selected": "false"
							}
						]
					},
					{
						"label": "Modify",
						"options": [
							{
								"value": "5", 
								"label": "Modify User",
								"selected": "true"
							},
							{
								"value": "6", 
								"label": "Modify Vehicle",
								"selected": "false"
							}
						]
					},
					{
						"label": "Delete",
						"options": [
							{
								"value": "7", 
								"label": "Delete User",
								"selected": "true"
							},
							{
								"value": "8", 
								"label": "Delete Vehicle",
								"selected": "false"
							}
						]
					}
				]
			}
        },

        /*
        serialize: function() {
                    return {
                        role: _.clone(this.model.attributes)
                    };
                },*/
        

        afterRender: function() {
			eventBus.trigger('set_selected_privileges', this);
		},
		
		renderPrivilegeMultiSelect: function() {
			componentFacade.init_multi_select('.searchable', this.privileges);
		},

        new_attributes: function() {
            return {
                role_name: this.$('#role-name').val().trim(),
                role_desc: this.$('#role-desc').val().trim(),
                privileges: this.$('#privileges').val(),
                enabled: this.$('#enabled').val().trim() === 'on' ? 'Yes' : 'No'
            }
        },
        
        clearValues: function() {
        	this.$('#role-name').val('');
			this.$('#role-desc').val('');
			this.$('#privileges').val('');
			this.$('#enabled').val('');
        },

        /**
         * Handling role instance creation.
         */
        create_role: function() {
        	// console.log(JSON.stringify(this.new_attributes()));
            roleColl.create(this.new_attributes());
            // roleColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
            //commonUtils.resetForm($('#new-modal'));
        }
    });

    module.exports = assignPrivilegeModal;
});
