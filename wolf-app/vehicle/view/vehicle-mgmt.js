define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var vehicleColl = require('../collection/vehicle-coll');
    var vehicleHeaderColl = require('../collection/vehicle-header-coll');
    var commonUtils = require('../../common/common-utils');
    var commonLoading = require('../../common/common-loading');
    var vehicleDatatable;
    var vehicleMgmt = Backbone.View.extend({
        manage: true,

        template: 'vehicle/templates/vehicle-mgmt.html',

        events: {
             //'click #vehicle-new-action': 'show_vehicle_modal',
             'click #vehicle-mgmt-delete': 'delete_vehicle'
         },

        initialize: function() {
            this.listenTo(vehicleHeaderColl, 'sync', this.after_load_vehicle_headers);
            this.listenTo(vehicleColl, 'sync', this.after_load_vehicles);
            vehicleHeaderColl.fetch();
        },

        after_load_vehicle_headers: function() {
            vehicleColl.fetch();
        },

        after_load_vehicles: function() {
            commonUtils.generate_datatable(vehicleHeaderColl.toJSON(), vehicleColl.toJSON(), 'vehicle-mgmt-datatable', function(datatable) {
                vehicleDatatable = datatable;
                $('#vehicle-mgmt-datatable').on('click', 'tbody tr', function(e) {
                    $(this).toggleClass('row_selected');
                    var selected_vehicle_id = $(this).find("td:first").html().trim();
                    var vehicle_model = vehicleColl.findWhere({
                        id: parseInt(selected_vehicle_id)
                    });
                    vehicle_model.toggle_select();
                });
                commonLoading.destroy();
            });
        },

        delete_vehicle: function(){
            _.invoke(vehicleColl.selected(), 'destroy');
            commonUtils.remove_selected_row(vehicleDatatable);
        },

        afterRender: function() {
            //TODO:
        }

    });

    module.exports = vehicleMgmt;
});
