define(function(require, exports, module) {

    require('modalEffects');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    
    var componentFacade = require('../../common/component-facade');

    var criteriaModal = Backbone.View.extend({
        manage: true,

        model: new criteriaModel(),

        prefix: 'criteria-mgmt/templates/modal/',

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
            componentFacade.init_switch();
            componentFacade.init_select2();
        },

        new_attributes: function() {
            return {
                cri_name: this.$('#cri-name').val().trim(),
                cri_desc: this.$('#cri-desc').val().trim(),
                obj_type: this.$('#obj-type').val().trim(),
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
