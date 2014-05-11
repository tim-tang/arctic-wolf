define(function(require, exports, module) {

    var $ = require('$');

    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

	var roleModel = require('../../model/role-model');
	var userGroupColl = require('app-user-group-mgmt').UserGroupColl;

    var roleUserGroup = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        datatable_id: 'assigned-user-groups-datatable',

        template: 'role-user-group.html',

		model: new roleModel(),

		collection: userGroupColl,

        initialize: function() {
            this.model.urlRoot = '/role-user-groups';
        },

        load_object: function() {
        	this.collection.set(this.model.get('user_groups')['aaData']);
        	this.init_datatable('user_groups');
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
