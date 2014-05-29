define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var eventBus = require('app-core').Eventbus;

    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var commonUtils = appCommon.CommonUtils;
    var genericInfoViewMixin = appCommon.GenericInfoViewMixin;
    var layoutFactory = require('app-common').GenericLayoutFactory;

    var vehicleModel = require('../../model/vehicle-model');

    var vehicleGeneralInfo = BaseView.extend({

        prefix: "vehicle-mgmt/src/tpl/tab/",

        template: 'vehicle-general-info.html',

        model: new vehicleModel(),

        pageStatus: 'view',

        initialize: function(options) {
        	this.model.urlRoot = '/vehicle-general-info';
        },

        events: {
            //TODO:
        },

		load_object: function() {
			var pageForm = $('#general-info');
            // Remove all attribute lines
            pageForm.children('.form-group').remove();

			var mock_attr = [{
                'id' : 6001,
                'name' : 'vehicle_desc',
                'desc' : 'Vehicle Description',
                'type' : 'text',
                'element_type' : 'textarea'
            }, {
                'id' : 6002,
                'name' : 'vehicle_brand',
                'desc' : 'Vehicle Brand',
                'type' : 'text',
                'element_type' : 'select'
            }, {
                'id' : 6003,
                'name' : 'vehicle_price',
                'desc' : 'Vehicle Price',
                'type' : 'text',
                'element_type' : 'select'
            }, {
                'id' : 6004,
                'name' : 'vehicle_model',
                'desc' : 'Vehicle Model',
                'type' : 'text',
                'element_type' : 'select'
            }, {
                'id' : 6005,
                'name' : 'vehicle_emission',
                'desc' : 'Vehicle Emission',
                'type' : 'text',
                'element_type' : 'select'
            }, {
                'id' : 6007,
                'name' : 'status',
                'desc' : 'Status',
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

    vehicleGeneralInfo.mixin(genericInfoViewMixin);
    module.exports = vehicleGeneralInfo;
});
