define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var eventBus = require('app-core').Eventbus;

    var roleModel = require('../../model/role-model');

    var roleGeneralInfo = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        template: 'role-general-info.html',

        model: new roleModel(),

        pageStatus: 'view',

        initialize: function() {
            //TODO:
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

    roleGeneralInfo.mixin(genericDetailsViewMixin);
    module.exports = roleGeneralInfo;
});
