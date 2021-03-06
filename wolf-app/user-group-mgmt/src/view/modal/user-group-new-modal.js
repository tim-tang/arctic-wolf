define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var componentFactory = require('app-common').GenericComponentFactory;
	var pageLayoutFactory = require('app-common').GenericPageLayoutFactory;

    var userGroupColl = require('../../collection/user-group-coll');
    var userGroupModel = require('../../model/user-group-model');

    var userGroupModal = Backbone.View.extend({
        manage: true,

        model: new userGroupModel(),

        prefix: 'user-group-mgmt/src/tpl/modal/',

        template: 'user-group-new-modal.html',

        events: {
            'click #user-group-create-action': 'create_user_group'
        },

        initialize: function() {
            this.users = {
				"component_type" : "SELECT2",
                "component_id" : "users",
                "multiple" : "multiple",
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
        	/*
        	componentFactory.makeComponent({
                'component_type' : 'CHECKBOX',
                'component_id' : 'enabled'
            });
            componentFactory.makeComponent(this.users);*/
            
            var pageForm = $('.modal-body');
            // Remove all attribute lines
            pageForm.children('.form-group').remove();

			var mock_attr = [{
                'id' : 3000,
                'name' : 'ug_name',
                'desc' : 'Name',
                'type' : 'text',
                'component_type' : 'INPUT'
            }, {
                'id' : 3001,
                'name' : 'ug_desc',
                'desc' : 'Description',
                'type' : 'text',
                'component_type' : 'TEXTAREA'
            }, {
                'id' : 1002,
                'name' : 'users',
                'desc' : 'Users',
                'component_options' : this.users
            }, {
                'id' : 3003,
                'name' : 'enabled',
                'desc' : 'Enabled',
                'type' : 'input',
                'component_type' : 'CHECKBOX'
            }];

            pageForm = pageLayoutFactory.makeLayout({
                'layout_type' : 'ONE_COLUMNS',
                'container' : pageForm,
                'attrs' : mock_attr,
                'model' : this.model
            });
        },

        new_attributes: function() {
            return {
                ug_name: this.$('#ug_name').val().trim(),
                ug_desc: this.$('#ug_desc').val().trim(),
                users: this.$('#users').val(),
                enabled: this.$('#enabled').val().trim() === 'on' ? 'Yes' : 'No'
            };
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
