define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var userGroupColl= = require('../collection/user-group-coll');
    // var userGroupAttrsColl = require('../collection/user-group-attrs-coll');
    var commonUtils = require('../../common/common-utils');
    var commonLoading = require('../../common/common-loading');
    var userGroupDatatable;

    var userGroupMgmt = Backbone.View.extend({
        manage: true,

        template: 'user-group/templates/user-group-mgmt.html',

        events: {
             // 'click #user-group-mgmt-delete': 'delete_user_group',
             // 'click #user-group-mgmt-edit': 'edit_user_group',
             // 'click #user-group-mgmt-view': 'view_user_group'
         },

        initialize: function() {
            // alert("initialize");
            // this.listenTo(userGroupColl, 'request', this.show_loading);
            // this.listenTo(userGroupColl, 'remove', this.hide_loading);
            // this.listenTo(userGroupColl, 'sync', this.after_load_user_groups);
            // userGroupColl.fetch();
            // userGroupAttrsColl.fetch();
        },

        afterRender: function() {
            //alert("UG mgmt afterRender");
            //TODO:
        },

        show_loading: function(){
            commonLoading.init('#main-content');
        },

        hide_loading: function(){
            commonLoading.destroy();
        }

        /*after_load_user_groups: function() {
            commonUtils.generate_datatable(userGroupColl.columns, userGroupColl.toJSON(), 'user-group-mgmt-datatable', function(datatable) {
                user-groupDatatable = datatable;
                $('#user-group-mgmt-datatable').on('click', 'tbody tr', function(e) {
                    $(this).toggleClass('row_selected');
                    var selected_user_group_id = $(this).find("td:first").html().trim();
                    var userGroupModel = userGroupColl.findWhere({
                        id: parseInt(selected_user_group_id)
                    });
                    userGroupModel.toggle_select();
                });
                commonLoading.destroy();
            });
        },*/

        /* view_user_group: function(e) {
            e.preventDefault();
            //TODO:
        },

        edit_user_group: function(e) {
            e.preventDefault();
            //TODO:
        },

        delete_user_group: function(e){
            e.preventDefault();
            _.invoke(userGroupColl.selected(), 'destroy');
            commonUtils.remove_selected_row(userGroupDatatable);
        } */
    });

    module.exports = userGroupMgmt;
});
