define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var vehicleMgmt = Backbone.View.extend({
        manage: true,

        template: 'vehicle/templates/vehicle-mgmt.html',

        initialize: function() {

        }

    });

    module.exports = vehicleMgmt;
});
