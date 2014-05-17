define(function(require, exports, module) {

    var $ = require('$');
    
	var BaseView = require('../mixin-base-view');
    var genericHistoryViewMixin = require('../../mixin/view/generic-obj-history-view-mixin');

    var objHistory = BaseView.extend({

        prefix: "app-common/src/tpl/subview/",

        template: 'obj-history.html',

        datatable_id: 'obj-history-datatable',

		model: null,

		collection: null,
    });

	objHistory.mixin(genericHistoryViewMixin);

    module.exports = objHistory;
});
