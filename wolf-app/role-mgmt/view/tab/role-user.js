define(function(require, exports, module) {

    var $ = require('$');
    var appCommon = require('../../../app-common/app-common-index');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

	var roleModel = require('../../model/role-model');
	var userColl = require('../../../user-mgmt/collection/user-coll');

    var roleUser = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        datatable_id: 'assigned-users-datatable',

        template: 'role-user.html',

		model: new roleModel(),

		collection: userColl,

        initialize: function() {
            this.model.urlRoot = '/role-users';
        },

        load_object: function() {
        	this.collection.set(this.model.get('users')['aaData']);
        	this.init_datatable('users');
       	},

        events: {
			//TODO:
        },

        afterRender: function() {
			//TODO:
        }
    });

	roleUser.mixin(genericDetailsViewMixin);

    module.exports = roleUser;
});
