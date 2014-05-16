define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	
	var objMgmtView = require('./subview/obj-mgmt');
	var objAssignView = require('./subview/obj-assign');
	var objHistoryView = require('./subview/obj-history');

	var genericViewFactory = {

		createView : function(viewName, options) {
			var subview = null;
			switch (viewName) {
				case 'OBJ_MGMT':
					subview = new objMgmtView(options);
					break;
				case 'OBJ_HISTORY':
					subview = new objHistoryView(options);
					break;
				case 'ASSIGN_OBJ':
                    subview = new objAssignView(options);
                    break;
			}
			return subview;
		}
	};
	module.exports = genericViewFactory;
});
