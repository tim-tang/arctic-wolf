define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    //var Backbone = require('backbone');
    var BaseView = require('../../base/view/base-view');
    var mgmtViewMixin = require('../../base/mixin/mgmt-view-mixin');
	var viewManager = require('../../app-main/app-view-manager');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var roleColl = require('../collection/role-coll');
    var roleModel = require('../model/role-model');
    
    var roleMgmt = BaseView.extend({

        prefix: "role-mgmt/templates/",

        template: 'role-mgmt.html',
        
        datatable_id: 'role-mgmt-datatable',
        
        collection: roleColl,

		view_obj: function(event) {
            if (event) event.preventDefault();
            alert("call role-details-app");
            require('../role-details-app').run(viewManager);
        },
        
        afterRender: function() {
            roleColl.fetch();
        }
    });

	roleMgmt.mixin(mgmtViewMixin);

    module.exports = roleMgmt;
});