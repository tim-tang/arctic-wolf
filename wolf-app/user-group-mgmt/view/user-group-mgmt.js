define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseView = require('../../base/view/base-view');
    var mgmtViewMixin = require('../../base/mixin/mgmt-view-mixin');
    
	var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var userGroupColl = require('../collection/user-group-coll');
    var userGroupModel = require('../model/user-group-model');
    
    var userGroupMgmt = BaseView.extend({

        prefix: "user-group-mgmt/templates/",

        template: 'user-group-mgmt.html',
        
        datatable_id: 'user-group-mgmt-datatable',
        
        collection: userGroupColl,

        initialize: function() {
            this.listenTo(userGroupColl, 'request', this.show_loading);
            this.listenTo(userGroupColl, 'remove', this.hide_loading);
            this.listenTo(userGroupColl, 'sync', this.load_objects);
        },

        afterRender: function() {
            userGroupColl.fetch();
        }
    });

	userGroupMgmt.mixin(mgmtViewMixin);
	
    module.exports = userGroupMgmt;
});
