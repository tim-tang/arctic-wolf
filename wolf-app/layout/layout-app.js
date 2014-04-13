define(function(require, exports, module) {

    //- Import dependency js
    require('jcookie');
    require('nanoscroller');
    require('sparkline');
    require('jquery-ui');
    require('gritter');
    require('bootstrap');


    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var layout = require('./view/layout');
    var commonUtils = require('../common/common-utils');

    var layoutApp = new Backbone.Layout({

        el: '#main-body',

        beforeRender: function() {
            $('#main-body').removeClass('texture');
        },

        views: {
            '': new layout()
        },

        afterRender: function() {
            //TODO:
        },

        /**
         * TODO: extract uri to constants.
         */
        switch_view: function() {
            switch (Backbone.history.fragment) {
            case "dashboard":
                break;
            case "product-search":
                alert('product search');
                break;
            case "user-mgmt":
                break;
            case "user-group-mgmt":
                var userGroupApp = require('../user-group/user-group-app');
                this.do_switch(userGroupApp);
                break;
            case "role-mgmt":
                break;
            case "role-details":
                break;
            case "privilege-mgmt":
                break;
            case "privilege-details":
                break;
            case "criteria-mgmt":
                break;
            case "criteria-details":
                break;
            case "vehicle-mgmt":
                var vehicleApp = require('../vehicle/vehicle-app');
                this.do_switch(vehicleApp);
                break;
            }
        },

        do_switch: function(activeApp) {
            commonUtils.active_menu_item();
            this.removeView('#main-content');
            this.insertView('#main-content', activeApp).render();
        }
    });

    module.exports = layoutApp;
});
