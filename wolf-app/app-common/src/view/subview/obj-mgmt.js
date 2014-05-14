define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');

    var BaseView = require('../mixin-base-view');
    var genericMgmtViewMixin = require('../../mixin/view/generic-mgmt-view-mixin');

    var objMgmt = BaseView.extend({

        prefix: "app-common/src/tpl/subview/",

        template: 'obj-mgmt.html',

		datatable_id: 'obj-mgmt-datatable',
        
        collection: null,
        
        view_url: null,
    });

    objMgmt.mixin(genericMgmtViewMixin);

    module.exports = objMgmt;
});
