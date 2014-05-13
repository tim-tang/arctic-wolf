 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
    var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;

    var criteriaModel = require('../model/criteria-model');

	var criteriaColl = BaseCollection.extend({

    	model: criteriaModel,

        url: '/criterias'
    });

    module.exports = new criteriaColl();
 });
