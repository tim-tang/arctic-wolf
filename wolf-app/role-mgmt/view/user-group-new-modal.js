define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var commonUtils = require('../../common/common-utils');
    var roleColl = require('../collection/role-coll');
    var roleModel = require('../model/role-model');

    var roleModal = Backbone.View.extend({
        manage: true,

        model: new roleModel(),

        prefix: 'role-mgmt/templates/',

        template: 'role-new-modal.html',

        events: {
            'click #role-create-action': 'create_user_group'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
        },

        /*
        serialize: function() {
                    return {
                        role: _.clone(this.model.attributes)
                    };
                },*/
        

        afterRender: function() {
            commonUtils.init_switch();
            commonUtils.init_multi_select();
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
         * Handling role instance creation.
         */
        create_user_group: function() {
        	// console.log(JSON.stringify(this.new_attributes()));
            roleColl.create(this.new_attributes());
            // roleColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
        }
    });

    module.exports = roleModal;
});
