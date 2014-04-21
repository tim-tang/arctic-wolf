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
         * TODO: Refactor other modules to use view manager.
         */
        switch_view: function() {

            //TODO: remove this line.
            this.removeView('#main-content');

            eventBus.trigger('active-menu-item');

            switch (Backbone.history.fragment) {
            case "dashboard":
                break;
            case "generic-filter/":
                require('../generic-filter/generic-filter-app').run(viewManager);
                break;
            case "user-mgmt/":
                var userApp = require('../user-mgmt/user-app');
                this.do_switch(userApp);
                break;
            case "user-group-mgmt/":
                var userGroupApp = require('../user-group-mgmt/user-group-app');
                this.do_switch(userGroupApp);
                break;
            case "role-mgmt/":
                var roleApp = require('../role-mgmt/role-app');
                this.do_switch(roleApp);
                break;
            case "privilege-mgmt/":
                var privilegeApp = require('../privilege-mgmt/privilege-app');
                this.do_switch(privilegeApp);
                break;
            case "criteria-mgmt/":
                var criteriaApp = require('../criteria-mgmt/criteria-app');
                this.do_switch(criteriaApp);
                break;
            case "vehicle-mgmt/":
                require('../vehicle-mgmt/vehicle-app').run(viewManager);
                break;
            }
        },

        /**
         * TODO: remove this method after refactor.
         */
        do_switch: function(activeApp) {
            this.insertView('#main-content', activeApp).render();
        }
    });

    module.exports = layoutApp;
});
