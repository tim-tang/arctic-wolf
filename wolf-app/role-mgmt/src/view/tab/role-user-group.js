define(function(require, exports, module) {

    var $ = require('$');

    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

	var roleModel = require('../../model/role-model');
	var userGroupColl = require('app-user-group-mgmt').UserGroupColl;
	var assignUserGroupModal = require('../modal/assign-user-group-modal');

    var roleUserGroup = BaseView.extend({

        prefix: "role-mgmt/src/tpl/tab/",

        datatable_id: 'assigned-user-groups-datatable',

        template: 'role-user-group.html',

		model: new roleModel(),

		collection: userGroupColl,

        collection_all: userGroupColl,

        initialize: function() {
            this.model.urlRoot = '/role-user-groups';
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

	roleUserGroup.mixin(genericDetailsViewMixin);

    module.exports = roleUserGroup;
});
