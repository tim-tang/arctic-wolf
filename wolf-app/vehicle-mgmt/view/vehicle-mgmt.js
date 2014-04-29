define(function(require, exports, module) {

    var _ = require('underscore');
    var BaseView = require('../../base/view/base-view');

    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');
    var eventBus = require('../../app-main/app-eventbus');

    var vehicleColl = require('../collection/vehicle-coll');
    var mgmtViewMixin = require('../../base/mixin/mgmt-view-mixin');

    var vehicleMgmt = BaseView.extend({

        prefix: "vehicle-mgmt/templates/",

        template: 'vehicle-mgmt.html',

        datatable_id: 'vehicle-mgmt-datatable',

        collection: vehicleColl,

        afterRender: function() {
            // waiting for all vehicle mgmt DOM element ready.
            vehicleColl.fetch();
        }
    });

    vehicleMgmt.mixin(mgmtViewMixin);
    module.exports = vehicleMgmt;
});
