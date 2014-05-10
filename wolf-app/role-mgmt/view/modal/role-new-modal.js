define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var roleColl = require('../../collection/role-coll');
    var roleModel = require('../../model/role-model');

	var componentFacade = require('../../../app-common/component-facade');

    var roleModal = Backbone.View.extend({
        manage: true,

        model: new roleModel(),

        prefix: 'role-mgmt/templates/modal/',

        template: 'role-new-modal.html',

		privileges: null,

        events: {
            'click #role-create-action': 'create_role'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            privileges = {
				"selector_id": "privileges",
				"multiple": "multiple",
				"optgroups": [
					{
						"label": "Read",
						"options": [
							{
								"value": "1",
								"label": "Read User"
							},
							{
								"value": "2",
								"label": "Read Vehicle"
							}
						]
					},
					{
						"label": "Create",
						"options": [
							{
								"value": "3",
								"label": "Create User"
							},
							{
								"value": "4",
								"label": "Create Vehicle"
							}
						]
					},
					{
						"label": "Modify",
						"options": [
							{
								"value": "5",
								"label": "Modify User"
							},
							{
								"value": "6",
								"label": "Modify Vehicle"
							}
						]
					},
					{
						"label": "Delete",
						"options": [
							{
								"value": "7",
								"label": "Delete User"
							},
							{
								"value": "8",
								"label": "Delete Vehicle"
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
            componentFacade.init_switch('.switch');
			componentFacade.init_select2('.select2', privileges);
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

    module.exports = roleModal;
});
