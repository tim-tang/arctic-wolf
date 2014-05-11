define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var componentFacade = require('app-common').ComponentFacade;

    var userGroupColl = require('../collection/user-group-coll');
    var userGroupModel = require('../model/user-group-model');

    var userGroupModal = Backbone.View.extend({
        manage: true,

        model: new userGroupModel(),

        prefix: 'user-group-mgmt/templates/',

        template: 'user-group-new-modal.html',

        events: {
            'click #user-group-create-action': 'create_user_group'
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
                        userGroup: _.clone(this.model.attributes)
                    };
                },*/


        afterRender: function() {
            componentFacade.init_switch('.switch');
			componentFacade.init_multi_select('.multi-select', this.users);
        },

        new_attributes: function() {
            return {
                ug_name: this.$('#ug-name').val().trim(),
                ug_desc: this.$('#ug-desc').val().trim(),
                users: this.$('#users').val(),
                enabled: this.$('#enabled').val().trim() === 'on' ? 'Yes' : 'No'
            }
        },

        /**
         * Handling user-group instance creation.
         */
        create_user_group: function() {
        	// console.log(JSON.stringify(this.new_attributes()));
            userGroupColl.create(this.new_attributes());
            // userGroupColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
        }
    });

    module.exports = userGroupModal;
});
