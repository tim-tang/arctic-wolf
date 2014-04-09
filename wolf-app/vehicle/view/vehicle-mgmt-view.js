define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var vehicleMgmt = Backbone.View.extend({
        manage: true,

        el: '#vehicle-home',
        template: 'vehicle/vehicle-mgmt.html',

        initialize: function() {
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });

    module.exports = vehicleMgmt;
});
