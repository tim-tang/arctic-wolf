define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var commonUtils = require('../../common/common-utils');
    var privilegeColl = require('../collection/privilege-coll');
    var privilegeModel = require('../model/privilege-model');

    var privilegeModal = Backbone.View.extend({
        manage: true,

        model: new privilegeModel(),

        prefix: 'privilege-mgmt/templates/',

        template: 'privilege-new-modal.html',

        events: {
            'click #privilege-create-action': 'create_privilege'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
        },

        /*
        serialize: function() {
                    return {
                        privilege: _.clone(this.model.attributes)
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
