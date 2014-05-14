define(function(require, exports, module) {

    //----------------- Common Views -------------------//
    module.exports.BaseView = require('./view/mixin-base-view');
    module.exports.GenericInfoViewMixin = require('./mixin/view/generic-info-view-mixin');
    module.exports.GenericDetailsViewMixin = require('./mixin/view/generic-details-view-mixin');
    module.exports.GenericHistoryViewMixin = require('./mixin/view/generic-history-view-mixin');
    module.exports.GenericMgmtViewMixin = require('./mixin/view/generic-mgmt-view-mixin');
    module.exports.BaseCollection = require('./collection/mixin-base-collection');
    module.exports.GenericCollectionMixin = require('./mixin/collection/generic-collection-mixin');

    //----------------- Common Utils -------------------//
    module.exports.CommonConstants = require('./common-constants');
    module.exports.CommonLoading = require('./common-loading');
    module.exports.CommonUtils = require('./common-utils');

    //---------------- Common Components ------------------//
    module.exports.ComponentFacade = require('./component-facade');
});
