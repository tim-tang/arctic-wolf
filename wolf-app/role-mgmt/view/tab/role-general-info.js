define(function(require, exports, module) {

    var $ = require('$');
	var _ = require('underscore');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');
    var componentFacade = require('../../../common/component-facade');

    var roleModel = require('../../model/role-model');

    var roleGeneralInfo = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        template: 'role-general-info.html',

        model: new roleModel(),

        pageStatus: 'view',

        initialize: function() {
        	this.listenTo(this.model, 'request', this.show_loading);
        	this.listenTo(this.model, 'sync', this.load_role_details);
			//$('#tab-content').children().remove();
            this.model.set({id: 1});
            this.model.fetch();
        },

        events: {
            //TODO:
        },


        load_role_details: function() {
            console.log(this.model.isNew());
            alert('load role details complete...');
            this.hide_loading();
        },

        afterRender: function() {
			componentFacade.init_switch('.switch');
        }
    });

	roleGeneralInfo.mixin(objDetailsViewMixin);
	module.exports = roleGeneralInfo;
});
