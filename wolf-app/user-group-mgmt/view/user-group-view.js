 define(function(require, exports, module) {
     require('bt-touchspin');

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var userGroupColl = require('../collection/user-group-coll');
     var userGroupAttrsColl = require('../collection/user-group-attrs-coll');
     var userGroupModel = require('../model/user-group-model');
     var common = require('../../common/common');

     var userGroupView = Backbone.View.extend({
         el: '#user-group-new-modal',

         model: new userGroupModel(),

         template: _.template($('#user-group-template').html()),

         events: {
             'click #user-group-create-action': 'create_user-group'
         },

         initialize: function() {
             this.listenTo(this.model, 'change', this.test);
         },

         test: function(){
            alert('3333');
         },

         render: function() {
             this.$el.html(this.template(this.model.toJSON()));

             /*// register touch spin
             $("#user-group-price").TouchSpin({
                min: -1000000000,
                max: 1000000000,
                stepinterval: 8,
                maxboostedstep: 10000000,
                prefix: '$'
             });*/
             return this;
         },

         new_attributes: function() {
            return {
                ug_name : this.$('#user-group-name').val().trim(),
            }
         },

        /**
         * Handling user-group instance creation.
         */
         create_user-group: function() {
             userGroupColl.create(this.new_attributes());
         }
     });

     module.exports = new userGroupView();
 });
