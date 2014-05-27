 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
	var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;
    
    var privilegeHistoryModel = require('../model/privilege-history-model');

	var privilegeHistoryColl = BaseCollection.extend({

    	model: privilegeHistoryModel,

        url: '/privilege-history'
    });

    module.exports = new privilegeHistoryColl();
 });
