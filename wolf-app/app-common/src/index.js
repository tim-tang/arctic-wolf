define(function(require, exports, module) {

    //----------------- Common Views -------------------//
    module.exports.BaseView = require('./view/mixin-base-view');
    module.exports.GenericInfoViewMixin = require('./mixin/generic-info-view-mixin');
    module.exports.GenericDetailsViewMixin = require('./mixin/generic-details-view-mixin');
    module.exports.GenericMgmtViewMixin = require('./mixin/generic-mgmt-view-mixin');

    //----------------- Common Utils -------------------//
    module.exports.CommonConstants = require('./common-constants');
    module.exports.CommonLoading = require('./common-loading');
    module.exports.CommonUtils = require('./common-utils');

    //---------------- Common Components ------------------//
    module.exports.ComponentFacade = require('./component-facade');
});
