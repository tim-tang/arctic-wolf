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
    var viewManager = require('../app-main/app-view-manager');

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
            this.insertView('#layout-logo-user-menu', new layoutUser()).render().promise().done(function() {
                self.insertView('#layout-logo-user-menu', new layoutMenu()).render();
            });
            this.insertView('#layout-profile', new layoutProfile()).render();
        },

        /**
         * TODO: extract uri to constants.
         *
         */
        switch_view: function() {

            eventBus.trigger('active-menu-item');

            switch (Backbone.history.fragment) {
            case "dashboard/":
                require('../dashboard/dashboard-app').run(viewManager);
                break;
            case "generic-filter/":
                require('../generic-filter/generic-filter-app').run(viewManager);
                break;
            case "user-mgmt/":
                require('../user-mgmt/user-app').run(viewManager);
                break;
            case "user-group-mgmt/":
                require('../user-group-mgmt/user-group-app').run(viewManager);
                break;
            case "role-mgmt/":
                require('../role-mgmt/role-app').run(viewManager);
                break;
            case "privilege-mgmt/":
                require('../privilege-mgmt/privilege-app').run(viewManager);
                break;
            case "criteria-mgmt/":
                require('../criteria-mgmt/criteria-app').run(viewManager);
                break;
            case "vehicle-mgmt/":
                require('../vehicle-mgmt/vehicle-app').run(viewManager);
                break;
            }
        }
    });

    module.exports = layoutApp;
});
