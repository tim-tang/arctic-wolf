define(function(require, exports, module) {

    var $ = require('$');
	var _ = require('underscore');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');
    
    var roleModel = require('../../../model/role-model');

    var rolePrivilge = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        template: 'role-privilege.html',

		model: roleModel,

        initialize: function() {
            $('#tab-content').children().remove();
        },

        events: {

        },

        afterRender: function() {
        	
        }
    });

	rolePrivilge.mixin(objDetailsViewMixin);

	module.exports = rolePrivilge;
});
