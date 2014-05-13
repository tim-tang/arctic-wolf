 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
    var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;
    
    var roleModel = require('../model/role-model');

	var roleColl = BaseCollection.extend({
		
		model: roleModel,
		
        url: '/roles',
    });

	roleColl.mixin(genericCollectionMixin);
	
    module.exports = new roleColl();
 });