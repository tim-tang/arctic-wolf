define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

    var userGroupColl = require('../collection/user-group-coll');
    var userGroupModel = require('../model/user-group-model');

    var userGroupMgmt = BaseView.extend({

        prefix: "user-group-mgmt/src/tpl/",

        template: 'user-group-mgmt.html',

        datatable_id: 'user-group-mgmt-datatable',

        collection: userGroupColl,

        afterRender: function() {
            userGroupColl.fetch();
        }
    });

	userGroupMgmt.mixin(genericMgmtViewMixin);

    module.exports = userGroupMgmt;
});
