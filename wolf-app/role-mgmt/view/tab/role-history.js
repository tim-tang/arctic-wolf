define(function(require, exports, module) {

    var $ = require('$');
    var BaseView = require('../../../base/view/base-view');
    var objMgmtViewMixin = require('../../../base/mixin/object-mgmt-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');

    var roleHistoryColl = require('../../collection/role-history-coll');

    var roleHistory = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        template: 'role-history.html',
        
        datatable_id: 'role-history-datatable',

		collection: roleHistoryColl,
		
		initialize: function() {
            $('#tab-content').children().remove();
        },
        
   		afterRender: function() {
   			roleHistoryColl.reset();
            roleHistoryColl.fetch();
        }
    });

	roleHistory.mixin(objMgmtViewMixin);

    module.exports = roleHistory;
});
