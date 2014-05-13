define(function(require, exports, module) {

    var $ = require('$');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericHistoryViewMixin = appCommon.GenericHistoryViewMixin;

    var commonUtils = appCommon.CommonUtils;

	var roleModel = require('../../model/role-model');
    var roleHistoryColl = require('../../collection/role-history-coll');

    var roleHistory = BaseView.extend({

        prefix: "role-mgmt/src/tpl/tab/",

        template: 'role-history.html',

        datatable_id: 'role-history-datatable',

		model: new roleModel(),

		collection: roleHistoryColl,
		
		initialize: function() {
            this.model.urlRoot = '/role-history';
        },
        
		load_history: function() {
			// Prepare collection
			this.collection.set(this.model.get('history')['aaData']);
        	// Initial assigned privileges datatable
        	this.init_datatable('history');
       	},
       	
   		afterRender: function() {
   			//TODO:
        }
    });

	roleHistory.mixin(genericHistoryViewMixin);

    module.exports = roleHistory;
});
