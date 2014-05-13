define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');

    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

    var appCore = require('app-core');
    var viewManager = appCore.viewMgmt;
    var eventBus = appCore.Eventbus;

    var roleColl = require('../collection/role-coll');

    var roleMgmt = BaseView.extend({

        prefix: "role-mgmt/src/tpl/",

        template: 'role-mgmt.html',

        datatable_id: 'role-mgmt-datatable',

        collection: roleColl,
        
        view_url: 'role-mgmt/view',

        afterRender: function() {
            roleColl.fetch();
        },
    });

    roleMgmt.mixin(genericMgmtViewMixin);

    module.exports = roleMgmt;
});
