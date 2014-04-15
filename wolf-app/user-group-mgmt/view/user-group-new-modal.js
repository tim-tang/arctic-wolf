define(function(require, exports, module) {

    require('modalEffects');
    require('bt-touchspin');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var commonUtils = require('../../common/common-utils');
    var userGroupColl = require('../collection/user-group-coll');
    var userGroupModel = require('../model/user-group-model');

    var userGroupModal = Backbone.View.extend({
        manage: true,

        model: new userGroupModel(),

        prefix: 'user-group-mgmt/templates/',

        template: 'user-group-new-modal.html',

        events: {
            'click #user-group-new-action': 'create_user_group'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
        },

        serialize: function() {
            return {
                user_group: _.clone(this.model.attributes)
            };
        },

        afterRender: function() {
            commonUtils.init_switch();
            commonUtils.init_multi_select();
        },

        new_attributes: function() {
            return {
                ug_name: this.$('#ug-name').val().trim(),
                ug_desc: this.$('#ug-desc').val().trim(),
                users: this.$('#users').val().trim(),
                enabled: this.$('#enabled').val().trim()
            }
        },

        /**
         * Handling user-group instance creation.
         */
        create_user_group: function() {
        	console.log(JSON.stringify(this.new_attributes));
            userGroupColl.create(this.new_attributes());
        }
    });

    module.exports = userGroupModal;
});
