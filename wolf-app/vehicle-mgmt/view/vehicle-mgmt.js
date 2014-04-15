define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var vehicleColl = require('../collection/vehicle-coll');
    var commonUtils = require('../../common/common-utils');
    var eventBus = require('../../app-main/app-eventbus');
    var vehicleMgmt = Backbone.View.extend({
        manage: true,

        prefix: "vehicle-mgmt/templates/",

        template: 'vehicle-mgmt.html',

        datatable: null,

        events: {
             'click #vehicle-mgmt-delete': 'delete_vehicle',
             'click #vehicle-mgmt-edit': 'edit_vehicle',
             'click #vehicle-mgmt-view': 'view_vehicle'
         },

        initialize: function() {
            this.listenTo(vehicleColl, 'request', eventBus.trigger('show-loading'));
            this.listenTo(vehicleColl, 'remove', eventBus.trigger('hide-loading'));
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
            self = this;
            console.log(vehicleColl.columns);
            console.log(vehicleColl.toJSON);
            commonUtils.generate_datatable(vehicleColl.columns, vehicleColl.toJSON(), 'vehicle-mgmt-datatable', function(datatable) {
                self.datatable= datatable;
                $('#vehicle-mgmt-datatable').on('click', 'tbody tr', function(e) {
                    $(this).toggleClass('row_selected');
                    var selected_vehicle_id = $(this).find("td:first").html().trim();
                    var vehicleModel = vehicleColl.findWhere({
                        id: parseInt(selected_vehicle_id)
                    });
                    vehicleModel.toggle_select();
                });
                eventBus.trigger('hide-loading')
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
            commonUtils.remove_selected_row(this.datatable);
        }
    });

    module.exports = vehicleMgmt;
});
