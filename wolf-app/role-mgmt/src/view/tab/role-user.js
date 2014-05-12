define(function(require, exports, module) {

    var $ = require('$');
    
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

	var roleModel = require('../../model/role-model');
	var userColl = require('app-user-mgmt').UserColl;
    var assignUserModal = require('../modal/assign-user-modal');

    var roleUser = BaseView.extend({

        prefix: "role-mgmt/src/tpl/tab/",

        datatable_id: 'assigned-users-datatable',

        template: 'role-user.html',

		model: new roleModel(),

		collection: userColl,

        initialize: function() {
            this.model.urlRoot = '/role-users';
            this.model.set('id', '777');
        },

        load_object: function() {
        	// Prepare collection
        	this.collection.set(this.model.get('users')['aaData']);
        	// Initial assigned users datatable
        	this.init_datatable('users');
        	// Insert Assign User Modal
        	this.insertView(new assignUserModal()).render();
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
