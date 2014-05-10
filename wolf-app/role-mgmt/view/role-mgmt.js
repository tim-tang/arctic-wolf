define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');

    var appCommon = require('../../app-common/index');
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

    var appCore = require('../../app-core/index');
    var viewManager = appCore.viewMgmt;
    var eventBus = appCore.Eventbus;

    var roleColl = require('../collection/role-coll');

    var roleMgmt = BaseView.extend({

        prefix: "role-mgmt/templates/",

        template: 'role-mgmt.html',

        datatable_id: 'role-mgmt-datatable',

        collection: roleColl,

        afterRender: function() {
            roleColl.fetch();
        }
    });

    roleMgmt.mixin(genericMgmtViewMixin);

    module.exports = roleMgmt;
});
