define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var eventBus = require('app-core').Eventbus;
    
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var commonUtils = appCommon.CommonUtils;
    var genericInfoViewMixin = appCommon.GenericInfoViewMixin;
    var layoutFactory = require('app-common').GenericLayoutFactory;

    var privilegeModel = require('../../model/privilege-model');

    var privilegeGeneralInfo = BaseView.extend({

        prefix: "privilege-mgmt/src/tpl/tab/",

        template: 'privilege-general-info.html',

        model: new privilegeModel(),

        pageStatus: 'view',

        initialize: function(options) {
        	this.model.urlRoot = '/privilege-general-info';
        },

        events: {
            //TODO:
        },

		load_object: function() {
			var pageForm = $('#general-info');
            // Remove all attribute lines
            pageForm.children('.form-group').remove();

			var mock_attr = [{
                'id' : 4000,
                'name' : 'priv_name',
                'desc' : 'Name',
                'type' : 'text',
                'element_type' : 'input'
            }, {
                'id' : 4001,
                'name' : 'priv_desc',
                'desc' : 'Description',
                'type' : 'text',
                'element_type' : 'textarea'
            }, {
                'id' : 4002,
                'name' : 'priv_type',
                'desc' : 'Privilege Type',
                'type' : 'text',
                'element_type' : 'select'
            }, {
                'id' : 4003,
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

    privilegeGeneralInfo.mixin(genericInfoViewMixin);
    module.exports = privilegeGeneralInfo;
});
