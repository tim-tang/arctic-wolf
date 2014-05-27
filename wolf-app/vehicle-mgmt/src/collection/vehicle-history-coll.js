 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
	var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;
    
    var vehicleHistoryModel = require('../model/vehicle-history-model');

	var vehicleHistoryColl = BaseCollection.extend({

    	model: vehicleHistoryModel,

        url: '/vehicle-history'
    });

    module.exports = new vehicleHistoryColl();
 });
