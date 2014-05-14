define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericInfoViewMixin = appCommon.GenericInfoViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var eventBus = require('app-core').Eventbus;

    var userModel = require('../../model/user-model');

    var userGeneralInfo = BaseView.extend({

        prefix: "user-mgmt/src/tpl/tab/",

        template: 'user-general-info.html',

        model: new userModel(),

        pageStatus: 'view',

        initialize: function(options) {
        	this.model.urlRoot = '/user-general-info';
        },

        events: {
            //TODO:
        },

		load_object: function() {
			console.log("##################In userGeneralInfo load_object()");
			$('#name').children().remove();
			$('#desc').children().remove();
			var name = $("<p class='control-label' style='text-align:left'>").text(this.model.get('user_name'));
			var desc = $("<p class='control-label' style='text-align:left'>").text(this.model.get('user_desc'));
			$('#name').append(name);
			$('#desc').append(desc);
       	},

        afterRender: function() {
            componentFacade.init_switch('.switch');
        }
    });

    userGeneralInfo.mixin(genericInfoViewMixin);
    module.exports = userGeneralInfo;
});
