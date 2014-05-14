define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;

    var eventBus = require('app-core').Eventbus;
    var criteriaColl = require('../collection/criteria-coll');
    var criteriaModel = require('../model/criteria-model');

    var criteriaMgmt = BaseView.extend({

        manage: true,

        prefix: "criteria-mgmt/src/tpl/",

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

	criteriaMgmt.mixin(genericMgmtViewMixin);

    module.exports = criteriaMgmt;
});
