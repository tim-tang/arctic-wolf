define(function(require, exports, module) {

    require('modalEffects');
    
    var $ = require('$');
	var _ = require('underscore');
    var Backbone = require('backbone');
    
    var privilegeColl = require('../collection/privilege-coll');
    var privilegeModel = require('../model/privilege-model');

	var componentFacade = require('../../common/component-facade');

    var privilegeModal = Backbone.View.extend({
        manage: true,

        model: new privilegeModel(),

        prefix: 'privilege-mgmt/templates/modal/',

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
            componentFacade.init_switch('.switch');
			componentFacade.init_select2('.select2');
        },

        new_attributes: function() {
            return {
                priv_name: this.$('#priv-name').val().trim(),
                priv_desc: this.$('#priv-desc').val().trim(),
                priv_type: this.$('#priv-type').val().trim(),
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
