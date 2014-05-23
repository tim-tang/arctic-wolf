define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var eventBus = require('app-core').Eventbus;
	var componentFacade = require('../../component-facade');
	var componentFactory = require('../../generic-component-factory.js');

    var objAssignModal = Backbone.View.extend({
    	
        manage: true,

        prefix: "app-common/src/tpl/subview/",

        template: 'obj-assign-modal.html',

		assignObjects: null,

        events: {
            'click #add-action': 'add_objects'
        },

        initialize: function() {
            this.assignObjects = [{
                "component_type": "MULTI_SELECT",
				"component_id": "privileges",
				"container_id": "assign-obj-container",
				"multiple": "multiple",
				"selected": [],
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
			},
			
			{
			    "component_type": "MULTI_SELECT",
                "component_id": "user-groups",
                "container_id": "assign-obj-container",
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
            },
            {
                "component_type": "MULTI_SELECT",
                "component_id": "users",
                "container_id": "assign-obj-container",
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
            }];
        },

        afterRender: function() {
			eventBus.trigger('role:set-selected-objects', this);
		},

		// Render multiple select
		renderMultiSelect: function(identity, source_collection) {
			console.log(source_collection);
			if(identity === 'privileges')
                componentFactory.makeComponent(this.assignObjects[0]);
            if(identity === 'user_groups')
                componentFactory.makeComponent(this.assignObjects[1]);
            if(identity === 'users')
                componentFactory.makeComponent(this.assignObjects[2]);
		},

        add_objects: function() {
            console.log('Add objects here...............');
        }
    });

    module.exports = objAssignModal;
});
