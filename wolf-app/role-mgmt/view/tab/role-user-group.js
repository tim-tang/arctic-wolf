define(function(require, exports, module) {

    var $ = require('$');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');

	var roleModel = require('../../model/role-model');

    var roleUserGroup = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        template: 'role-user-group.html',

		model: roleModel,

        initialize: function() {
            $('#tab-content').children().remove();
        },

        events: {

        },

        afterRender: function() {

        }
    });

	roleUserGroup.mixin(objDetailsViewMixin);

    module.exports = roleUserGroup;
});
