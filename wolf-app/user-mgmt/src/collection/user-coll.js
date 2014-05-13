 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
    var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;

    var userModel = require('../model/user-model');

	var userColl = BaseCollection.extend({

    	model: userModel,

        url: '/users'
    });

    module.exports = new userColl();
 });
