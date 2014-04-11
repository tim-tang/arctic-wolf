define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var vehicleColl = require('../collection/vehicle-coll');
    var vehicleHeaderColl = require('../collection/vehicle-header-coll');
    var commonUtils = require('../../common/common-utils');
    var vehicleMgmt = Backbone.View.extend({
        manage: true,

        template: 'vehicle/templates/vehicle-mgmt.html',

        initialize: function() {
            this.listenTo(vehicleHeaderColl, 'sync', this.after_load_vehicle_headers);
            this.listenTo(vehicleColl, 'sync', this.after_load_vehicles);
            vehicleHeaderColl.fetch();
        },

        after_load_vehicle_headers: function() {
            vehicleColl.fetch();
        },

        after_load_vehicles: function(){
            this.datatable = commonUtils.generate_datatable(vehicleHeaderColl.toJSON(), vehicleColl.toJSON(), 'vehicle-mgmt-datatable');
        },

        afterRender: function() {
            //TODO:
        }

    });

    module.exports = vehicleMgmt;
});
