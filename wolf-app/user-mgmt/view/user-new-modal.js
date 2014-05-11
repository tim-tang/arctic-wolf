define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var appCommon = require('app-common');
    var commonUtils = appCommon.CommonUtils;

    var userColl = require('../collection/user-coll');
    var userModel = require('../model/user-model');

    var userModal = Backbone.View.extend({
        manage: true,

        model: new userModel(),

        prefix: 'user-mgmt/templates/',

        template: 'user-new-modal.html',

        events: {
            'click #user-create-action': 'create_user'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
        },

        /*
        serialize: function() {
                    return {
                        user: _.clone(this.model.attributes)
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
         * Handling user instance creation.
         */
        create_user: function() {
        	// console.log(JSON.stringify(this.new_attributes()));
            userColl.create(this.new_attributes());
            // userColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
        }
    });

    module.exports = userModal;
});
