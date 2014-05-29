 define(function(require, exports, module){

    var Backbone = require('backbone');
    var vehicleModel= Backbone.Model.extend({

        urlRoot: '/vehicles',

        defaults: {
            vehicle_desc: '',
            vehicle_brand: '',
            vehicle_price: '',
            vehicle_model: '',
            vehicle_emission: '',
            status: '',
            is_selected: false
        },

        // set is_selected attribute status.
        toggle_select: function(){
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = vehicleModel;
 });
