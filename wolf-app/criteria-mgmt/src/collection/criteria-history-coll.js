 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
	var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;
    
    var criteriaHistoryModel = require('../model/criteria-history-model');

	var criteriaHistoryColl = BaseCollection.extend({

    	model: criteriaHistoryModel,

        url: '/criteria-history'
    });

    module.exports = new criteriaHistoryColl();
 });
