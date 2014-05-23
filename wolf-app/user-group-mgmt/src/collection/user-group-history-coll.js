 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
	var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;
    
    var userGroupHistoryModel = require('../model/user-group-history-model');

	var userGroupHistoryColl = BaseCollection.extend({

    	model: userGroupHistoryModel,

        url: '/user-group-history'
    });

    module.exports = new userGroupHistoryColl();
 });
