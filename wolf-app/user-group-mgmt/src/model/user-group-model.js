 define(function(require, exports, module){

    var Backbone = require('backbone');

    var userGroupModel = Backbone.Model.extend({

		idAttribute: 'id',
		
        urlRoot: '/user-groups',

        defaults: {
            ug_name: '',
            ug_desc: '',
            users: '',
            enabled: '',
            is_selected: false
        },

        // set is_selected attribute status.
        toggle_select: function() {
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = userGroupModel;
 });
