define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    //var Backbone = require('backbone');
    var BaseView = require('../../base/view/base-view');
    var objMgmtViewMixin = require('../../base/mixin/object-mgmt-view-mixin');
	var viewManager = require('../../app-main/app-view-manager');

    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var roleColl = require('../collection/role-coll');
    
    var roleMgmt = BaseView.extend({

        prefix: "role-mgmt/templates/",

        template: 'role-mgmt.html',
        
        datatable_id: 'role-mgmt-datatable',
        
        collection: roleColl,
        
        afterRender: function() {
            roleColl.fetch();
        }
    });

	roleMgmt.mixin(objMgmtViewMixin);

    module.exports = roleMgmt;
});
