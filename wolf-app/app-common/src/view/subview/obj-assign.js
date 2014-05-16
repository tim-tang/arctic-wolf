define(function(require, exports, module) {

    var $ = require('$');
    
    var BaseView = require('../mixin-base-view');
    var genericDetailsViewMixin = require('../../mixin/view/generic-details-view-mixin');

    var objAssignView = BaseView.extend({

        prefix: "app-common/src/tpl/subview/",

        datatable_id: 'assigned-obj-datatable',

        template: 'obj-assign.html',

		model: null,

		collection: null,
        
        identity: '',
        
        source_collection: null,
        
        assignPrivilegeModal: null
    });

	objAssignView.mixin(genericDetailsViewMixin);

	module.exports = objAssignView;
});
