define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var roleColl = require('../../collection/role-coll');
    var roleModel = require('../../model/role-model');

    var componentFactory = require('app-common').GenericComponentFactory;
    var pageLayoutFactory = require('app-common').GenericPageLayoutFactory;

    var roleModal = Backbone.View.extend({
        manage : true,

        model : new roleModel(),

        prefix : 'role-mgmt/src/tpl/modal/',

        template : 'role-new-modal.html',

        privileges : null,

        events : {
            'click #role-create-action' : 'create_role'
        },

        initialize : function() {
            //this.listenTo(this.model, 'change', this.test);
            this.privileges = {
                "component_type" : "SELECT2",
                "component_id" : "privileges",
                "multiple" : "multiple",
                "optgroups" : [{
                    "label" : "Read",
                    "options" : [{
                        "value" : "1",
                        "label" : "Read User"
                    }, {
                        "value" : "2",
                        "label" : "Read Vehicle"
                    }]
                }, {
                    "label" : "Create",
                    "options" : [{
                        "value" : "3",
                        "label" : "Create User"
                    }, {
                        "value" : "4",
                        "label" : "Create Vehicle"
                    }]
                }, {
                    "label" : "Modify",
                    "options" : [{
                        "value" : "5",
                        "label" : "Modify User"
                    }, {
                        "value" : "6",
                        "label" : "Modify Vehicle"
                    }]
                }, {
                    "label" : "Delete",
                    "options" : [{
                        "value" : "7",
                        "label" : "Delete User"
                    }, {
                        "value" : "8",
                        "label" : "Delete Vehicle"
                    }]
                }]
            };
        },

        /*
         serialize: function() {
         return {
         role: _.clone(this.model.attributes)
         };
         },*/

        afterRender : function() {
            /*componentFactory.makeComponent({
                'component_type' : 'CHECKBOX',
                'component_id' : 'enabled'
            });
            componentFactory.makeComponent(this.privileges);*/
            
            var pageForm = $('.modal-body');
            // Remove all attribute lines
            pageForm.children('.form-group').remove();

			var mock_attr = [{
                'id' : 1000,
                'name' : 'role_name',
                'desc' : 'Name',
                'type' : 'text',
                'component_type' : 'INPUT'
            }, {
                'id' : 1001,
                'name' : 'role_desc',
                'desc' : 'Description',
                'type' : 'text',
                'component_type' : 'TEXTAREA'
            }, {
                'id' : 1002,
                'name' : 'privilege',
                'desc' : 'Privileges',
                'component_options' : this.privileges
            }, {
                'id' : 1003,
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

        new_attributes : function() {
            return {
                role_name : this.$('#role-name').val().trim(),
                role_desc : this.$('#role-desc').val().trim(),
                //privileges: this.$('#privileges').val(),
                enabled : this.$('#enabled').val().trim() === 'on' ? 'Yes' : 'No'
            };
        },

        clearValues : function() {
            this.$('#role-name').val('');
            this.$('#role-desc').val('');
            this.$('#privileges').val('');
            this.$('#enabled').val('');
        },

        /**
         * Handling role instance creation.
         */
        create_role : function() {
            // console.log(JSON.stringify(this.new_attributes()));
            roleColl.create(this.new_attributes());
            // roleColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
            //commonUtils.resetForm($('#new-modal'));
        }
    });

    module.exports = roleModal;
});
