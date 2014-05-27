 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    
    var appCommon = require('app-common');
    var BaseCollection = appCommon.BaseCollection;
    var genericCollectionMixin = appCommon.GenericCollectionMixin;

    var vehicleModel = require('../model/vehicle-model');

    var vehicleColl = BaseCollection.extend({

        model: vehicleModel,

        url: '/vehicles'
    });

    module.exports = new vehicleColl();
 });
