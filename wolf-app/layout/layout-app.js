define(function(require, exports, module) {

    //- Import dependency js
    require('nanoscroller');
    require('sparkline');
    require('gritter');
    require('bootstrap');

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var appCommon = require('../app-common/index');
    var commonUtils = appCommon.CommonUtils;

    var layoutLogo = require('./view/layout-logo');
    var layoutUser = require('./view/layout-user');
    var layoutMenu = require('./view/layout-menu');
    var layoutProfile = require('./view/layout-profile');
    var eventBus = require('../app-core/app-eventbus');
    var viewManager = require('../app-core/app-view-manager');

    var layoutApp = new Backbone.Layout({

        retain: true,

        prefix: "layout/templates/",

        template: 'layout.html',

        initialize: function() {
            //TODO:
        },

        beforeRender: function() {
            $('#main-body').removeClass('texture');
        },

        afterRender: function() {
            // -- insert layout logo view
            var layoutLogoView = new layoutLogo();
            this.insertView('#layout-logo-user-menu', layoutLogoView).render();

            // -- insert layout user view
            var self = this;
            var layoutUserView = new layoutUser();
            this.insertView('#layout-logo-user-menu', layoutUserView).render().promise().done(function() {
                // -- insert layout menu view
                var layoutMenuView = new layoutMenu();
                self.insertView('#layout-logo-user-menu', layoutMenuView).render();
            });

            // -- insert layout profile view
            var layoutProfileView = new layoutProfile();
            this.insertView('#layout-profile', layoutProfileView).render();
        }
    });

    module.exports = layoutApp;
});
