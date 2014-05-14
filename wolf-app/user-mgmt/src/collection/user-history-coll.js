 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
	var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;
    
    var userHistoryModel = require('../model/user-history-model');

	var userHistoryColl = BaseCollection.extend({

    	model: userHistoryModel,

        url: '/user-history'
    });

    module.exports = new userHistoryColl();
 });
