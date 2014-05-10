define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');

    var appCommon = require('../../app-common/index');
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

    var eventBus = require('../../app-core/index').Eventbus;

    var userColl = require('../collection/user-coll');
    var userModel = require('../model/user-model');

    var userMgmt = BaseView.extend({

        prefix: "user-mgmt/templates/",

        template: 'user-mgmt.html',

        datatable_id: 'user-mgmt-datatable',

        collection: userColl,

        afterRender: function() {
            userColl.fetch();
        }
    });

    userMgmt.mixin(genericMgmtViewMixin);

    module.exports = userMgmt;
});
