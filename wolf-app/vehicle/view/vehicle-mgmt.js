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
            //this.listenTo(vehicleHeaderColl, 'sync', this.load_vehicle_records);
            //this.listenTo(vehicleColl, 'sync', this.render);
            vehicleHeaderColl.fetch();
            vehicleColl.fetch();
        },

        afterRender: function() {
            this.datatable = commonUtils.generate_datatable(vehicleHeaderColl.toJSON(), vehicleColl.toJSON(), 'vehicle-mgmt-datatable');
        }

    });

    module.exports = vehicleMgmt;
});
