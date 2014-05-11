define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var roleColl = require('../../collection/role-coll');
    var roleModel = require('../../model/role-model');

	var componentFacade = require('../../../app-common/index').ComponetFacade;

    var roleModal = Backbone.View.extend({
        manage: true,

        model: new roleModel(),

        prefix: 'role-mgmt/templates/modal/',

        template: 'assign-user-modal.html',

		privileges: null,

        events: {
            'click #role-create-action': 'create_role'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.users = {
				"selector_id": "users",
				"multiple": "multiple",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "User01"
							},
							{
								"value": "2",
								"label": "User02"
							},
							{
								"value": "3",
								"label": "User03"
							}
						]
					},
				]
			};
        },

        /*
        serialize: function() {
                    return {
                        role: _.clone(this.model.attributes)
                    };
                },*/


        afterRender: function() {
            componentFacade.init_switch('.switch');
			componentFacade.init_multi_select('.searchable', this.users);
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
