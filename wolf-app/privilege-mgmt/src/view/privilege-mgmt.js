define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');

    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var eventBus = require('app-core').Eventbus;

    var privilegeColl = require('../collection/privilege-coll');
    var privilegeModel = require('../model/privilege-model');

    var privilegeMgmt = BaseView.extend({

        prefix: "privilege-mgmt/src/tpl/",

        template: 'privilege-mgmt.html',

        datatable_id: 'privilege-mgmt-datatable',

        collection: privilegeColl,

        afterRender: function() {
            privilegeColl.fetch();
        }
    });

	privilegeMgmt.mixin(genericMgmtViewMixin);

    module.exports = privilegeMgmt;
});