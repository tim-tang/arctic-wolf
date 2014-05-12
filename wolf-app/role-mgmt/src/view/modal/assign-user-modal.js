define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var roleColl = require('../../collection/role-coll');
    var roleModel = require('../../model/role-model');

	var eventBus = require('app-core').Eventbus;
	var componentFacade = require('app-common').ComponentFacade;

    var roleModal = Backbone.View.extend({
        manage: true,

        model: new roleModel(),

        prefix: 'role-mgmt/src/tpl/modal/',

        template: 'assign-user-modal.html',

		assignObjects: null,

        events: {
            'click #role-create-action': 'create_role'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.assignObjects = {
				"selector_id": "users",
				"multiple": "multiple",
				"selected": [],
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "Administrators"
							},
							{
								"value": "2",
								"label": "Tim"
							},
							{
								"value": "3",
								"label": "Johnny"
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
            eventBus.trigger('set_selected_objects', this);
		},

		renderMultiSelect: function() {
			componentFacade.init_multi_select('.searchable', this.assignObjects);
		},

        new_attributes: function() {
            return {
                role_name: this.$('#role-name').val().trim(),
                role_desc: this.$('#role-desc').val().trim(),
                privileges: this.$('#privileges').val(),
                enabled: this.$('#enabled').val().trim() === 'on' ? 'Yes' : 'No'
            };
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
