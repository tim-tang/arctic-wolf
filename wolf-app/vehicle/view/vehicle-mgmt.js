define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var vehicleColl = require('../collection/vehicle-coll');
    var commonUtils = require('../../common/common-utils');
    var commonLoading = require('../../common/common-loading');
    var vehicleDatatable;
    var vehicleMgmt = Backbone.View.extend({
        manage: true,

        template: 'vehicle/templates/vehicle-mgmt.html',

        events: {
             'click #vehicle-mgmt-delete': 'delete_vehicle',
             'click #vehicle-mgmt-edit': 'edit_vehicle',
             'click #vehicle-mgmt-view': 'view_vehicle'
         },

        initialize: function() {
            this.listenTo(vehicleColl, 'request', this.show_loading);
            this.listenTo(vehicleColl, 'remove', this.hide_loading);
            this.listenTo(vehicleColl, 'sync', this.after_load_vehicles);
        },

        afterRender: function() {
            // waiting for all vehicle mgmt dom element ready.
            // then build datatable.
            vehicleColl.fetch();
        },

        show_loading: function(){
            commonLoading.init('#main-content');
        },

        hide_loading: function(){
            commonLoading.destroy();
        },

        after_load_vehicles: function() {
            commonUtils.generate_datatable(vehicleColl.columns, vehicleColl.toJSON(), 'vehicle-mgmt-datatable', function(datatable) {
                vehicleDatatable = datatable;
                $('#vehicle-mgmt-datatable').on('click', 'tbody tr', function(e) {
                    $(this).toggleClass('row_selected');
                    var selected_vehicle_id = $(this).find("td:first").html().trim();
                    var vehicleModel = vehicleColl.findWhere({
                        id: parseInt(selected_vehicle_id)
                    });
                    vehicleModel.toggle_select();
                });
                commonLoading.destroy();
            });
        },

        view_vehicle: function(e) {
            e.preventDefault();
            //TODO:
        },

       edit_vehicle: function(e) {
            e.preventDefault();
            //TODO:
       },

        delete_vehicle: function(e){
            e.preventDefault();
            _.invoke(vehicleColl.selected(), 'destroy');
            commonUtils.remove_selected_row(vehicleDatatable);
        }
    });

    module.exports = vehicleMgmt;
});
