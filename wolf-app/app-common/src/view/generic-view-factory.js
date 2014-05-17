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
					/*
					 * Parameter 'options' should contain below varibles
					 * - view_url: url of view specific object, ie. - 'role-mgmt/view',
					 * - collection: collection of mgmt object, ie. - roleColl
					 */
					subview = new objMgmtView(options);
					break;
				case 'OBJ_ASSIGN':
					/*
					 * Parameter 'options' should contain below varibles
					 * - identity: indicator to assign which object, ie. - 'privileges',
					 * - model: object which have assigned other objects ie. - new objModel({'id' : roleId}),
					 * - collection: collection of assigned objects, ie. - privilegeColl
					 * - source_collection: collection of all objects which can be assigned, ie. - privilegeColl
					 */
                    subview = new objAssignView(options);
                    break;
				case 'OBJ_HISTORY':
					/*
					 * Parameter 'options' should contain below varibles
					 * - urlRoot: located source on server, ie. - '/role-history',
					 * - model: of which object's history, ie. - new roleModel({'id' : roleId}),
					 * - collection: collection of history, ie. - roleHistoryColl
					 */
					subview = new objHistoryView(options);
					break;
			}
			return subview;
		}
	};
	module.exports = genericViewFactory;
});
