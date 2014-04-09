 define(function(require, exports, module) {
     require('bt-touchspin');

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var vehicleMgmt= require('./view/vehicle-mgmt-view');
     var vehicleModal = require('./view/vehicle-modal-view');
     //var vehicleRouter = require('./router/vehicle-router');
     //var vehicleColl = require('./collection/vehicle-coll');
     //var vehicleHeaderColl = require('./collection/vehicle-header-coll');
     //var vehicleView = require('./view/vehicle-view');
     //var common = require('../common/common');

     var datatable;

     var vehicleApp = Backbone.Layout.extend({
         el: '#main-content',
         template: 'vehicle/vehicle-container.html',

         events: {
             //'click #vehicle-new-action': 'show_vehicle_modal',
             //'click #vehicle-mgmt-delete': 'delete_vehicle'
         },

         initialize: function() {
             //this.render();
             //var self = this;
             //templateMgmt.fetch_template('vehicle/vehicle-container', function(contents){
             //    console.log(contents);
             //   self.template = contents;
             //   self.render();
             //});
             //this.listenTo(vehicleHeaderColl, 'sync', this.load_vehicle_records);
             //this.listenTo(vehicleColl, 'sync', this.render);
             //vehicleHeaderColl.fetch();
         },

         render: function(template, context) {
            return template(context);
            //this.$el.html(this.template());
            //var vehicleMgmtView = new vehicleMgmt();
            //this.$el.find('#vehicle-home').append(vehicleMgmtView.el);
            //return this;
        },

        afterRender: function(){
            this.insertView(new vehicleMgmt()).render();
            this.insertView(new vehicleModal()).render();
        }



         //show_vehicle_modal: function() {
         //    vehicleView.render();
         //},

         //load_vehicle_records: function() {
         //    vehicleColl.fetch();
         //},

         //render: function() {
         //    datatable = common.populate_datatable(vehicleHeaderColl.toJSON(), vehicleColl.toJSON(), 'vehicle-mgmt-datatable');
         //    $('#vehicle-mgmt-datatable').on('click', 'tbody tr', function(e) {
         //        $(this).toggleClass('row_selected');
         //        var selected_vehicle_id = $(this).find("td:first").html().trim();
         //        var vehicle_model = vehicleColl.findWhere({
         //            id: parseInt(selected_vehicle_id)
         //        });
         //        vehicle_model.toggle_select();
         //    });
         //},


         ///**
         // * Handling vehicle instance deletion.
         // */
         //delete_vehicle: function() {
         //    _.invoke(vehicleColl.selected(), 'destroy');
         //    common.remove_selected_row(datatable);
         //}
     });
     module.exports = vehicleApp;
 });
