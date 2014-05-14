define(function(require, exports, module) {

    var $ = require('$');

    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

	var userModel = require('../../model/user-model');
	var userGroupColl = require('app-user-group-mgmt').UserGroupColl;
	var assignUserGroupModal = require('../modal/assign-user-group-modal');

    var userUserGroup = BaseView.extend({

        prefix: "user-mgmt/src/tpl/tab/",

        datatable_id: 'assigned-user-groups-datatable',

        template: 'user-user-group.html',

		model: new userModel(),

		collection: userGroupColl,

        collection_all: userGroupColl,

        initialize: function() {
            this.model.urlRoot = '/user-user-groups';
        },

        load_object: function() {
        	// Prepare collection
        	this.collection.set(this.model.get('user_groups')['aaData']);
        	// Initial assigned user group datatable
        	this.init_datatable('user_groups');
        	// Insert Assign User Group Modal
        	this.insertView(new assignUserGroupModal()).render();
       	},

        events: {
			//TODO:
        },

        afterRender: function() {
			//TODO:
        }
    });

	userUserGroup.mixin(genericDetailsViewMixin);

    module.exports = userUserGroup;
});
