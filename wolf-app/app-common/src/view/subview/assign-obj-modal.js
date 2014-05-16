define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var eventBus = require('app-core').Eventbus;
	var componentFacade = require('../../component-facade');

    var assignObjModal = Backbone.View.extend({
    	
        manage: true,

        prefix: "app-common/src/tpl/subview/",

        template: 'assign-obj-modal.html',

		assignObjects: null,

        events: {
            'click #add-action': 'add_objects'
        },

        initialize: function() {
            this.assignObjects = [{
				"selector_id": "privileges",
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
            },
            {
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
            }];
        },

        afterRender: function() {
			eventBus.trigger('role:set-selected-objects', this);
		},

		// Render multiple select
		renderMultiSelect: function(identity, source_collection) {
			console.log(source_collection);
			if(identity === 'privileges')
                componentFacade.init_multi_select('.searchable', this.assignObjects[0]);
            if(identity === 'user-groups')
                componentFacade.init_multi_select('.searchable', this.assignObjects[1]);
            if(identity === 'users')
                componentFacade.init_multi_select('.searchable', this.assignObjects[2]);
		},

        add_objects: function() {
            console.log('Add objects here...............');
        }
    });

    module.exports = assignObjModal;
});
