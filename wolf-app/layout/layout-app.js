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
    var commonUtils = require('../common/common-utils');
    var layoutLogo = require('./view/layout-logo');
    var layoutUser = require('./view/layout-user');
    var layoutMenu = require('./view/layout-menu');
    var layoutProfile = require('./view/layout-profile');
    var eventBus = require('../app-main/app-eventbus');

    var layoutApp = new Backbone.Layout({

        el: '#main-body',

        prefix: "layout/templates/",

        template: 'layout.html',

        initialize: function() {
            eventBus.on('switch-view', this.switch_view, this);
        },

        beforeRender: function() {
            $('#main-body').removeClass('texture');
        },

        afterRender: function() {
            this.insertView('#layout-logo-user-menu', new layoutLogo()).render();
            var self = this;
            this.insertView('#layout-logo-user-menu', new layoutUser()).render().promise().done(function(){
                self.insertView('#layout-logo-user-menu', new layoutMenu()).render();
            });
            this.insertView('#layout-profile', new layoutProfile()).render();
        },

        /**
         * TODO: extract uri to constants.
         */
        switch_view: function() {
            this.removeView('#main-content');

            switch (Backbone.history.fragment) {
            case "dashboard":
                break;
            case "product-search":
                alert('product search');
                break;
            case "user-mgmt":
                break;
            case "user-group-mgmt":
                var userGroupApp = require('../user-group-mgmt/user-group-app');
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
            case "vehicle-mgmt/":
                var vehicleApp = require('../vehicle-mgmt/vehicle-app');
                this.do_switch(vehicleApp);
                break;
            }
        },

        do_switch: function(activeApp) {
            eventBus.trigger('active-menu-item');
            this.insertView('#main-content', activeApp).render();
        }
    });

    module.exports = layoutApp;
});
