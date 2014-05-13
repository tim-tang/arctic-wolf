 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
    var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;

    var privilegeModel = require('../model/privilege-model');

	var privilegeColl = BaseCollection.extend({

    	model: privilegeModel,

        url: '/privileges',
    });

    module.exports = new privilegeColl();
 });
