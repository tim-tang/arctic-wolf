 define(function(require, exports, module){

    var Backbone = require('backbone');
    var BaseModel = require('../../common/model/base-model');

    var vehicleModel= Backbone.Model.extend({

        urlRoot: '/vehicles',

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
