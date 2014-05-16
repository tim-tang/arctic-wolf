define(function(require, exports, module) {

    var $ = require('$');
    
    var BaseView = require('../mixin-base-view');
    var genericDetailsViewMixin = require('../../mixin/view/generic-details-view-mixin');

    var rolePrivilge = BaseView.extend({

        prefix: "app-common/src/tpl/subview/",

        datatable_id: 'assigned-obj-datatable',

        template: 'obj-obj.html',

		model: null,

		collection: null,
        
        identity: '',
        
        source_collection: null,
        
        assignPrivilegeModal: null
    });

	rolePrivilge.mixin(genericDetailsViewMixin);

	module.exports = rolePrivilge;
});
