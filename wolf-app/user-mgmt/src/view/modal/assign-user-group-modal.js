define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var userColl = require('../../collection/user-coll');
    var userModel = require('../../model/user-model');

	var eventBus = require('app-core').Eventbus;
	var componentFacade = require('app-common').ComponentFacade;

    var userModal = Backbone.View.extend({
        manage: true,

        model: new userModel(),

        prefix: 'user-mgmt/src/tpl/modal/',

        template: 'assign-user-group-modal.html',

		assignObjects: null,

        events: {
            'click #user-create-action': 'create_user'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.assignObjects = {
				"selector_id": "user-groups",
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
								"label": "User Group 01"
							},
							{
								"value": "3",
								"label": "Sales"
							}
						]
					},
				]
			};
        },

        /*
        serialize: function() {
                    return {
                        user: _.clone(this.model.attributes)
                    };
                },*/


        afterRender: function() {
            eventBus.trigger('user:set-selected-objects', this);
		},
		
		renderMultiSelect: function() {
			componentFacade.init_multi_select('.searchable', this.assignObjects);
		},

        new_attributes: function() {
            return {
                user_name: this.$('#user-name').val().trim(),
                user_desc: this.$('#user-desc').val().trim(),
                privileges: this.$('#privileges').val(),
                enabled: this.$('#enabled').val().trim() === 'on' ? 'Yes' : 'No'
            };
        },

        clearValues: function() {
        	this.$('#user-name').val('');
			this.$('#user-desc').val('');
			this.$('#privileges').val('');
			this.$('#enabled').val('');
        },

        /**
         * Handling user instance creation.
         */
        create_user: function() {
        	// console.log(JSON.stringify(this.new_attributes()));
            userColl.create(this.new_attributes());
            // userColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
            //commonUtils.resetForm($('#new-modal'));
        }
    });

    module.exports = userModal;
});
