define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseView = require('../../base/view/base-view');
    var mgmtViewMixin = require('../../base/mixin/mgmt-view-mixin');
    
    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var privilegeColl = require('../collection/privilege-coll');
    var privilegeModel = require('../model/privilege-model');

    var privilegeMgmt = BaseView.extend({
    	
        prefix: "privilege-mgmt/templates/",

        template: 'privilege-mgmt.html',
        
        datatable_id: 'privilege-mgmt-datatable',
        
        collection: privilegeColl,

        afterRender: function() {
            privilegeColl.fetch();
        }
    });

	privilegeMgmt.mixin(mgmtViewMixin);

    module.exports = privilegeMgmt;
});
