define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
	var _ = require('underscore');
    var Backbone = require('backbone');

    var privilegeColl = require('../../collection/privilege-coll');
    var privilegeModel = require('../../model/privilege-model');

	var componentFactory = require('app-common').GenericComponentFactory;
	var pageLayoutFactory = require('app-common').GenericPageLayoutFactory;

    var privilegeModal = Backbone.View.extend({
        manage: true,

        model: new privilegeModel(),

        prefix: 'privilege-mgmt/src/tpl/modal/',

        template: 'privilege-new-modal.html',

        events: {
            'click #privilege-create-action': 'create_privilege'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.privilegeType = {
				"component_type" : "SELECT2",
                "component_id" : "privilege-type",
				"optgroups": [
					{
						"options": [
							{
								"value": "1",
								"label": "Read"
							},
							{
								"value": "2",
								"label": "Create"
							},
							{
								"value": "3",
								"label": "Modify"
							},
							{
								"value": "4",
								"label": "Delete"
							}
						]
					},
				]
			};

			this.criterias = {
				"component_type" : "SELECT2",
                "component_id" : "criteria",
				"optgroups": [
					{
						"label": "Vehicle",
						"options": [
							{
								"value": "1",
								"label": "All Vehicle"
							},
							{
								"value": "2",
								"label": "Red Car"
							}
						]
					},
					{
						"label": "User",
						"options": [
							{
								"value": "3",
								"label": "All User"
							},
							{
								"value": "4",
								"label": "All Administrator"
							}
						]
					}
				]
			};
        },

        /*
        serialize: function() {
                    return {
                        privilege: _.clone(this.model.attributes)
                    };
                },*/


        afterRender: function() {
        	/*
        	componentFactory.makeComponent({
                'component_type' : 'CHECKBOX',
                'component_id' : 'enabled'
            });
            componentFactory.makeComponent(this.criterias);
            componentFactory.makeComponent(this.privilegeType);*/
            
            var pageForm = $('.modal-body');
            // Remove all attribute lines
            pageForm.children('.form-group').remove();
            
            var mock_attr = [{
                'id' : 4000,
                'name' : 'priv_name',
                'desc' : 'Name',
                'type' : 'text',
                'component_type' : 'INPUT'
            }, {
                'id' : 4001,
                'name' : 'priv_desc',
                'desc' : 'Description',
                'type' : 'text',
                'component_type' : 'TEXTAREA'
            }, {
                'id' : 4002,
                'name' : 'priv_type',
                'desc' : 'Privilege Type',
                'type' : 'text',
                'component_type' : 'SELECT2'
            }
            /*, {
                'id' : 4003,
                'name' : 'enabled',
                'desc' : 'Enabled',
                'type' : 'input',
                'component_type' : 'CHECKBOX'
            }*/];

            pageForm = pageLayoutFactory.makeLayout({
                'layout_type' : 'ONE_COLUMNS',
                'container' : pageForm,
                'attrs' : mock_attr,
                'model' : this.model
            });

        },

        new_attributes: function() {
            return {
                priv_name: this.$('#privilege-name').val().trim(),
                priv_desc: this.$('#privilege-desc').val().trim(),
                priv_type: this.$('#privilege-type').val().trim(),
                criteria: this.$('#criteria').val().trim(),
                enabled: this.$('#enabled').val().trim() === 'on' ? 'Yes' : 'No'
            }
        },

        /**
         * Handling privilege instance creation.
         */
        create_privilege: function() {
        	// console.log(JSON.stringify(this.new_attributes()));
            privilegeColl.create(this.new_attributes());
            // privilegeColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
        }
    });

    module.exports = privilegeModal;
});
