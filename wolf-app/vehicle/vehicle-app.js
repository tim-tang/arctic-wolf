 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var vehicleMgmt = require('./view/vehicle-mgmt');
     var vehicleModal = require('./view/vehicle-new-modal');
     //var vehicleRouter = require('./router/vehicle-router');
     //var vehicleColl = require('./collection/vehicle-coll');
     //var vehicleHeaderColl = require('./collection/vehicle-header-coll');
     //var vehicleView = require('./view/vehicle-view');
     //var common = require('../common/common');

     //var datatable;

     var vehicleApp = new Backbone.Layout({

        manage: true,

        keep: true,

        template: 'vehicle/templates/vehicle-container.html',

        events: {
             //'click #vehicle-new-action': 'show_vehicle_modal',
             //'click #vehicle-mgmt-delete': 'delete_vehicle'
         },

        afterRender: function(){
            this.insertView('#vehicle-home', new vehicleMgmt()).render();
            this.insertView('#vehicle-home', new vehicleModal()).render();
        },

         //initialize: function() {
         //    //this.render();
         //    //var self = this;
         //    //templateMgmt.fetch_template('vehicle/vehicle-container', function(contents){
         //    //    console.log(contents);
         //    //   self.template = contents;
         //    //   self.render();
         //    //});
         //    //this.listenTo(vehicleHeaderColl, 'sync', this.load_vehicle_records);
         //    //this.listenTo(vehicleColl, 'sync', this.render);
         //    //vehicleHeaderColl.fetch();
         //},


        // render: function(template, context) {
        //     alert('in process..');
        //   // return template(context);
        //    //this.$el.html(this.template());
        //    //var vehicleMgmtView = new vehicleMgmt();
        //    //this.$el.find('#vehicle-home').append(vehicleMgmtView.el);
        //    //return this;
        //},


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
