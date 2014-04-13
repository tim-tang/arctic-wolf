 define(function(require, exports, module) {

     require('modalEffects');
     require('bt-touchspin');

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var userGroupColl = require('../collection/user-group-coll');
     var userGroupModel = require('../model/user-group-model');

     var userGroupModal = Backbone.View.extend({
         manage: true,
         model: new userGroupModel(),

         //template: _.template($('#user-group-template').html()),
         template: 'user-group/templates/user-group-new-modal.html',

         events: {
             'click #user-group-create-action': 'create_user_group'
         },

         initialize: function() {
             //this.listenTo(this.model, 'change', this.test);
         },


         serialize: function() {
            return { user-group: _.clone(this.model.attributes) };

         },

         afterRender: function() {
         },

         new_attributes: function(){
            return {
                user_group_name : this.$('#user-group-name').val().trim(),
                user_group_desc : this.$('#user-group-desc').val().trim()
            }
         },

        /**
         * Handling user-group instance creation.
         */
         create_user_group: function() {
             userGroupColl.create(this.new_attributes());
         }
     });

     module.exports = userGroupModal;
 });
