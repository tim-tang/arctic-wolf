define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var eventBus = require('app-core').Eventbus;
    
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var commonUtils = appCommon.CommonUtils;
    var genericInfoViewMixin = appCommon.GenericInfoViewMixin;
    var pageLayoutFactory = require('app-common').GenericPageLayoutFactory;

    var criteriaModel = require('../../model/criteria-model');

    var criteriaGeneralInfo = BaseView.extend({

        prefix: "criteria-mgmt/src/tpl/tab/",

        template: 'criteria-general-info.html',

        model: new criteriaModel(),

        pageStatus: 'view',

        initialize: function(options) {
        	this.model.urlRoot = '/criteria-general-info';
        },

        events: {
            //TODO:
        },

		load_object: function() {
			var pageForm = $('#general-info');
            // Remove all attribute lines
            pageForm.children('.form-group').remove();

			var mock_attr = [{
                'id' : 5000,
                'name' : 'cri_name',
                'desc' : 'Name',
                'type' : 'text',
                'element_type' : 'input'
            }, {
                'id' : 5001,
                'name' : 'cri_desc',
                'desc' : 'Description',
                'type' : 'text',
                'element_type' : 'textarea'
            }, {
                'id' : 5002,
                'name' : 'obj_type',
                'desc' : 'Object Type',
                'type' : 'text',
                'element_type' : 'select'
            }, {
                'id' : 5003,
                'name' : 'enabled',
                'desc' : 'Enabled',
                'type' : 'input',
                'element_type' : 'checkbox'
            }];

            pageForm = pageLayoutFactory.makeLayout({
                'layout_type' : 'TWO_COLUMNS',
                'container' : pageForm,
                'attrs' : mock_attr,
                'model' : this.model
            });
       	},

        afterRender: function() {
            //TODO:
        }
    });

    criteriaGeneralInfo.mixin(genericInfoViewMixin);
    module.exports = criteriaGeneralInfo;
});
