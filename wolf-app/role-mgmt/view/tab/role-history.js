define(function(require, exports, module) {

    var $ = require('$');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');
    
    var roleModel = require('.././../model/role-model');

    var roleHistory = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        template: 'role-history.html',

		model: roleModel,
		
        initialize: function() {
            $('#tab-content').children().remove();
        },

        events: {

        },

        afterRender: function() {

        }
    });

	roleHistory.mixin(objDetailsViewMixin);

    module.exports = roleHistory;
});
