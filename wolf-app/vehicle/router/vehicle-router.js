define(function(require, exports, module){

    var Backbone = require('backbone');
    var vehicleColl = require('../collection/vehicle-coll');

    var workspace = Backbone.Router.extend({
        routers: {
            '*edit-vehicle': 'edit_vehicle'
        },

        edit_vehicle: function(){
            alert('#####');
        }
    });

    module.exports = workspace;
});
