define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseView = require('../../base/view/base-view');
    var objMgmtViewMixin = require('../../base/mixin/object-mgmt-view-mixin');
    
    var eventBus = require('../../app-main/app-eventbus');
    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');

    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');
    
    var criteriaMgmt = BaseView.extend({

        manage: true,

        prefix: "criteria-mgmt/templates/",

        template: 'criteria-mgmt.html',
        
        datatable_id: 'criteria-mgmt-datatable',
        
        collection: criteriaColl,

        afterRender: function() {
            criteriaColl.fetch();
        },
        
        new_obj: function(event) {
            if (event) event.preventDefault();
            eventBus.trigger('reset_criteria_new_modal');
        }
	});

	criteriaMgmt.mixin(objMgmtViewMixin);

    module.exports = criteriaMgmt;
});
