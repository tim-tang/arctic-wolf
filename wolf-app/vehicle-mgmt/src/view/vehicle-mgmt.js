define(function(require, exports, module) {

    var _ = require('underscore');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

    var eventBus = require('app-core').Eventbus;
    var vehicleColl = require('../collection/vehicle-coll');

    var vehicleMgmt = BaseView.extend({

        prefix: "vehicle-mgmt/src/tpl/",

        template: 'vehicle-mgmt.html',

        datatable_id: 'vehicle-mgmt-datatable',

        collection: vehicleColl,

        afterRender: function() {
            // waiting for all vehicle mgmt DOM element ready.
            vehicleColl.fetch();
        }
    });

    vehicleMgmt.mixin(genericMgmtViewMixin);

    module.exports = vehicleMgmt;
});
