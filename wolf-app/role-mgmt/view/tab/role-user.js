define(function(require, exports, module) {

    var $ = require('$');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');
    var componentFacade = require('../../../common/component-facade');

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

	roleUser.mixin(objDetailsViewMixin);

    module.exports = roleUser;
});
