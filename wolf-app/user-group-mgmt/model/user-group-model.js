 define(function(require, exports, module){

    var Backbone = require('backbone');

    var userGroupModel = Backbone.Model.extend({

        urlRoot: App.WS_HOST + '/user-groups',

        defaults: {
            id: '',
            ug_name: '',
            ug_desc: '',
            users: '',
            enabled: ''
        },

        // set is_selected attribute status.
        toggle_select: function() {
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = userGroupModel;
 });