define(function(require, exports, module) {

    require('css-bootstrap');
    require('css-general');

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

        switch_view: function() {
            switch (Backbone.history.fragment) {
            case "dashboard":
                alert('dashboard');
                break;
            case "product-search":
                alert('product search');
                break;
            case "user-mgmt":
                break;
            case "user-group-mgmt":
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
            this.removeView('#main-content');
            this.insertView('#main-content', activeApp).render();
        }
    });

    module.exports = layoutApp;
});
