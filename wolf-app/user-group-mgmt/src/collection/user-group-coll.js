 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
    var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;

    var userGroupModel = require('../model/user-group-model');

	var userGroupColl = BaseCollection.extend({

    	model: userGroupModel,

        url: '/user-groups'
    });

    module.exports = new userGroupColl();
 });
