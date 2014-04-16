define(function(require, exports, module) {

    require('modalEffects');
    require('quicksearch');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var commonUtils = require('../../common/common-utils');
    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');

    var criteriaModal = Backbone.View.extend({
        manage: true,

        model: new criteriaModel(),

        prefix: 'criteria-mgmt/templates/',

        template: 'criteria-new-modal.html',

        events: {
            'click #criteria-create-action': 'create_criteria'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
        },

        /*
        serialize: function() {
                    return {
                        criteria: _.clone(this.model.attributes)
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
         * Handling criteria instance creation.
         */
        create_criteria: function() {
        	// console.log(JSON.stringify(this.new_attributes()));
            criteriaColl.create(this.new_attributes());
            // criteriaColl.add(this.model.set(this.new_attributes()));
            // Backbone.sync("create", model);
        }
    });

    module.exports = criteriaModal;
});
