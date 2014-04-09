 define(function(require, exports, module){

    var Backbone = require('backbone');

    var vehicleModel= Backbone.Model.extend({
        defaults: {
            vehicle_name: '',
            vehicle_price: '168',
            vehicle_desc: '',
            is_selected: false
        },

        // set is_selected attribute status.
        toggle_select: function(){
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = vehicleModel;
 });
