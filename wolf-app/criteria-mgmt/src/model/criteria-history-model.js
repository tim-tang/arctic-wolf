 define(function(require, exports, module){

    var Backbone = require('backbone');

    var criteriaHistoryModel = Backbone.Model.extend({

        urlRoot: '/criteria-history',

        defaults: {
            action: '',
            user_name: '',
            date_time: '',
            details: '',
            is_selected: false
        },

        // set is_selected attribute status.
        toggle_select: function() {
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = criteriaHistoryModel;
 });
