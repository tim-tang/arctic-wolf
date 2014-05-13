 define(function(require, exports, module){

    var Backbone = require('backbone');

    var roleModel = Backbone.Model.extend({

		idAttribute: 'id',
		
        urlRoot: '/roles',

        defaults: {
        	id: '',
            role_name: '',
            role_desc: '',
            privileges: '',
            enabled: '',
            is_selected: false
        },

        // Set is_selected attribute status.
        toggle_select: function() {
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = roleModel;
 });