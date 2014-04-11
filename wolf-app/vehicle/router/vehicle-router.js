define(function(require, exports, module){

    var Backbone = require('backbone');
    //var vehicleColl = require('../collection/vehicle-coll');

    var vehicleRouter = Backbone.Router.extend({
        routers: {
            'vehicle-new': 'vehicle_new'
        },

        vehicle_new: function() {
            alert('#####');
        }
    });

    module.exports = vehicleRouter;
});
