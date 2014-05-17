define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericInfoViewMixin = appCommon.GenericInfoViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var eventBus = require('app-core').Eventbus;

    var roleModel = require('../../model/role-model');

    var roleGeneralInfo = BaseView.extend({

        prefix: "role-mgmt/src/tpl/tab/",

        template: 'role-general-info.html',

        model: new roleModel(),

        pageStatus: 'view',

        initialize: function(options) {
        	this.model.urlRoot = '/role-general-info';
        },

        events: {
            //TODO:
        },

		load_object: function() {
			console.log("##################In roleGeneralInfo load_object()");
			
			
			
			$('#name').children().remove();
			$('#desc').children().remove();
			var name = $("<p class='control-label' style='text-align:left'>").text(this.model.get('role_name'));
			var desc = $("<p class='control-label' style='text-align:left'>").text(this.model.get('role_desc'));
			$('#name').append(name);
			$('#desc').append(desc);
       	},

        afterRender: function() {
            componentFacade.init_switch('.switch');
        }
    });

    roleGeneralInfo.mixin(genericInfoViewMixin);
    module.exports = roleGeneralInfo;
});
