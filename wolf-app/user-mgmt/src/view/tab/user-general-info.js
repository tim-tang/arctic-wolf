define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var eventBus = require('app-core').Eventbus;
    
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var commonUtils = appCommon.CommonUtils;
    var genericInfoViewMixin = appCommon.GenericInfoViewMixin;
    var layoutFactory = require('app-common').GenericLayoutFactory;

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
			var pageForm = $('#general-info');
            // Remove all attribute lines
            pageForm.children('.form-group').remove();

			var mock_attr = [{
                'id' : 2000,
                'name' : 'u_name',
                'desc' : 'Name',
                'type' : 'text',
                'element_type' : 'input'
            }, {
                'id' : 2001,
                'name' : 'u_desc',
                'desc' : 'Description',
                'type' : 'text',
                'element_type' : 'textarea'
            }, {
                'id' : 2002,
                'name' : 'u_email',
                'desc' : 'Email',
                'type' : 'text',
                'element_type' : 'textarea'
            }, {
                'id' : 2003,
                'name' : 'enabled',
                'desc' : 'Enabled',
                'type' : 'input',
                'element_type' : 'checkbox'
            }];

            pageForm = layoutFactory.makeLayout({
                'layout_type' : '2_COLUMNS',
                'container' : pageForm,
                'attrs' : mock_attr,
                'model' : this.model
            });
       	},

        afterRender: function() {
            //TODO:
        }
    });

    userGeneralInfo.mixin(genericInfoViewMixin);
    module.exports = userGeneralInfo;
});
