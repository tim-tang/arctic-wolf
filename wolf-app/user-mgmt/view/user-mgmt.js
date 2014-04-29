define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseView = require('../../base/view/base-view');
    var mgmtViewMixin = require('../../base/mixin/mgmt-view-mixin');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var userColl = require('../collection/user-coll');
    var userModel = require('../model/user-model');

    var userMgmt = BaseView.extend({
    	
        prefix: "user-mgmt/templates/",

        template: 'user-mgmt.html',
        
        datatable_id: 'user-mgmt-datatable',
        
        collection: userColl,

        initialize: function() {
            this.listenTo(userColl, 'request', this.show_loading);
            this.listenTo(userColl, 'remove', this.hide_loading);
            this.listenTo(userColl, 'sync', this.load_objects);
        },

        afterRender: function() {
            userColl.fetch();
        }
    });

    userMgmt.mixin(mgmtViewMixin);
    
    module.exports = userMgmt;
});
