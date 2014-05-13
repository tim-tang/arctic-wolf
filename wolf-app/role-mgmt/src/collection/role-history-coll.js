 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
	var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;
    
    var roleHistoryModel = require('../model/role-history-model');

	var roleHistoryColl = BaseCollection.extend({

    	model: roleHistoryModel,

        url: '/role-history'
    });

    module.exports = new roleHistoryColl();
 });
