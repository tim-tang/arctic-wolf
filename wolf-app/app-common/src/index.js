define(function(require, exports, module) {

    //----------------- Common Views -------------------//
    module.exports.GenericViewFactory = require('./view/generic-view-factory');
    module.exports.BaseView = require('./view/mixin-base-view');
    module.exports.GenericMgmtViewMixin = require('./mixin/view/generic-obj-mgmt-view-mixin');
    module.exports.GenericInfoViewMixin = require('./mixin/view/generic-obj-info-view-mixin');
    module.exports.GenericDetailsViewMixin = require('./mixin/view/generic-obj-assign-view-mixin');
    module.exports.GenericHistoryViewMixin = require('./mixin/view/generic-obj-history-view-mixin');
    module.exports.BaseCollection = require('./collection/mixin-base-collection');
    module.exports.GenericCollectionMixin = require('./mixin/collection/generic-collection-mixin');

    //----------------- Common Utils -------------------//
    module.exports.CommonConstants = require('./common-constants');
    module.exports.CommonLoading = require('./common-loading');
    module.exports.CommonUtils = require('./common-utils');

    //---------------- Common Components ------------------//
    module.exports.GenericComponentFactory = require('./generic-component-factory');
    module.exports.GenericPageLayoutFactory = require('./generic-page-layout-factory');
});