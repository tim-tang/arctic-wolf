define(function(require, exports, module) {

    var $ = require('$');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');
    var componentFacade = require('../../../common/component-facade');

	var roleModel = require('../../model/role-model');
	var userGroupColl = require('../../../user-group-mgmt/collection/user-group-coll');

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

	roleUserGroup.mixin(objDetailsViewMixin);

    module.exports = roleUserGroup;
});
