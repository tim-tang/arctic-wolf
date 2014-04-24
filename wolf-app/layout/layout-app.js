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

        layout: true,

        prefix: "layout/templates/",

        template: 'layout.html',

        initialize: function() {
            eventBus.on('switch-view', this.switch_view, this);
            this.subviews = [];
        },

        beforeRender: function() {
            $('#main-body').removeClass('texture');
        },

        afterRender: function() {
            // -- insert layout logo view
            var layoutLogoView = new layoutLogo();
            this.insertView('#layout-logo-user-menu', layoutLogoView).render();
            this.subviews.push(layoutLogoView);

            // -- insert layout user view
            var self = this;
            var layoutUserView = new layoutUser();
            this.insertView('#layout-logo-user-menu', layoutUserView).render().promise().done(function() {
                // -- insert layout menu view
                var layoutMenuView = new layoutMenu();
                self.insertView('#layout-logo-user-menu', layoutMenuView).render();
                self.subviews.push(layoutMenuView);
            });
            this.subviews.push(layoutUserView);

            // -- insert layout profile view
            var layoutProfileView = new layoutProfile();
            this.insertView('#layout-profile', layoutProfileView).render();
            this.subviews.push(layoutProfileView);
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
