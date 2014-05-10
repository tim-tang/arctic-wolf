define(function(require, exports, module) {

    var $ = require('$');
    var appCommon = require('../../../app-common/app-common-index');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;

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

	roleHistory.mixin(genericDetailsViewMixin);

    module.exports = roleHistory;
});
