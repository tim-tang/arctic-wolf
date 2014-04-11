define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var vehicleMgmt= require('./vehicle-mgmt');
    var vehicleModal = require('./vehicle-new-modal');
    var vehicleContainer = Backbone.View.extend({

        manage: true,

        template: 'vehicle/templates/vehicle-container.html',

        afterRender: function(){
            this.insertView('#vehicle-home', new vehicleMgmt()).render();
            this.insertView('#vehicle-home', new vehicleModal()).render();
        }

    });

    module.exports = vehicleContainer;

});
