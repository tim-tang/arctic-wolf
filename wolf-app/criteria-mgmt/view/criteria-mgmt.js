define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseView = require('../../base/view/base-view');
    var mgmtViewMixin = require('../../base/mixin/mgmt-view-mixin');
    
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
        
        initialize: function() {
            this.listenTo(criteriaColl, 'request', this.show_loading);
            this.listenTo(criteriaColl, 'remove', this.hide_loading);
            this.listenTo(criteriaColl, 'sync', this.load_objects);
        },

        afterRender: function() {
            criteriaColl.fetch();
        }
	});

	criteriaMgmt.mixin(mgmtViewMixin);

    module.exports = criteriaMgmt;
});
