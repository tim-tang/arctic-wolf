 define(function(require, exports, module) {

     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');

     var eventBus = require('../app-core/app-eventbus');
     var appCommon = require('../app-common/app-common-index');
	 var commonLoading = appCommon.CommonLoading;
     var viewManager = require('../app-core/app-view-manager');

     var roleMgmt = require('./view/role-mgmt');
     var roleModal = require('./view/modal/role-new-modal');
     var roleDetailsApp = require('./role-details-app');

     var roleApp = new Backbone.Layout({

         //el: '#main-content',
         manage: true,

         keep: true,

         prefix: "role-mgmt/templates/",

         template: 'role-container.html',

         events: {
             //TODO:
         },

         initialize: function() {
             eventBus.on('show-loading', this.show_loading, this);
             eventBus.on('hide-loading', this.hide_loading, this);
             eventBus.on('role:view-role', this.view_role, this);
         },

         afterRender: function() {
             var roleMgmtView = new roleMgmt();
             this.insertView('#role-home', roleMgmtView).render();

             var roleModalView = new roleModal();
             this.insertView('#role-home', roleModalView).render();
         },

         show_loading: function() {
             commonLoading.init('#main-content');
         },

         hide_loading: function() {
             commonLoading.destroy();
         },

         view_role: function() {
             var roleDetailsApp = new roleDetailsApp();
             this.insertView('#role-home', roleModalView).render();
             this.subviews.push(roleModalView);
         }
     });

     module.exports = {
         run: function(viewManager) {
             viewManager.show('#main-content', roleApp);
         },

         invokeRoleRouter: function() {
             var roleRouter = require('./router/role-router');
             return new roleRouter('role-mgmt/', {
                 createTrailingSlashRoutes: true
             });
         }
     };
 });
