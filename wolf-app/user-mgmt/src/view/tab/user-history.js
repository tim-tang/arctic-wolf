define(function(require, exports, module) {

    var $ = require('$');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericHistoryViewMixin = appCommon.GenericHistoryViewMixin;

    var commonUtils = appCommon.CommonUtils;

	var userModel = require('../../model/user-model');
    var userHistoryColl = require('../../collection/user-history-coll');

    var userHistory = BaseView.extend({

        prefix: "user-mgmt/src/tpl/tab/",

        template: 'user-history.html',

        datatable_id: 'user-history-datatable',

		model: new userModel(),

		collection: userHistoryColl,
		
		initialize: function() {
            this.model.urlRoot = '/user-history';
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

	userHistory.mixin(genericHistoryViewMixin);

    module.exports = userHistory;
});
