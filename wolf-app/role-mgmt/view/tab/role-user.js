define(function(require, exports, module) {

    var $ = require('$');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

	var roleModel = require('../../model/role-model');
	var userColl = require('app-user-mgmt').UserColl;

    var roleUser = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        datatable_id: 'assigned-users-datatable',

        template: 'role-user.html',

		model: new roleModel(),

		collection: userColl,

        initialize: function() {
            this.model.urlRoot = '/role-users';
            this.model.set('id', '777');
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
