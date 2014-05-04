define(function(require, exports, module) {

    var $ = require('$');
	var _ = require('underscore');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');
    var componentFacade = require('../../../common/component-facade');
    
    var roleModel = require('../../../model/role-model');

    var roleGeneralInfo = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        template: 'role-general-info.html',
        
        model: roleModel,
        
        pageStatus: 'view',

        initialize: function() {
			$('#tab-content').children().remove();
        },

        events: {
        	
        },

        afterRender: function() {
			componentFacade.init_switch('.switch');
        }
    });

	roleGeneralInfo.mixin(objDetailsViewMixin);

	module.exports = roleGeneralInfo;
});
