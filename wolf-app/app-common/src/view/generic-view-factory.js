define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	
	var objMgmtView = require('./subview/obj-mgmt');

	var genericViewFactory = {

		createView : function(viewName, options) {
			var subview = null;
			switch (viewName) {
				case "OBJ_MGMT":
					subview = new objMgmtView(options);
					break;
			}
			
			return subview;
		}
	};
	module.exports = genericViewFactory;
});
