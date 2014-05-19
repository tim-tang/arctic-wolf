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

		prefix : "role-mgmt/src/tpl/tab/",

		template : 'role-general-info.html',

		model : new roleModel(),

		pageMode : 'view',

		initialize : function(options) {
			this.model.urlRoot = '/role-general-info';
			this.pageMode = options.pageMode ? options.pageMode : this.pageMode;
		},

		events : {
			//TODO:
		},

		load_object : function() {
			console.log("##################In roleGeneralInfo load_object()");
            var pageForm = $('#general-info');
            pageForm.children('.form-group').remove();
            
			/*
			 * Generate a line for an element， such as:
			 * <div class="form-group">
			 *	<label class="col-sm-3 control-label">Enabled</label>
			 *	<div class="col-sm-6">
			 *  	<div class="switch" data-on="success">
			 *       	<input type="checkbox" checked="">
			 * 		</div>
			 *	</div>
			 * </div>
			 *
			 * Each line is a div with class 'form-group', two elements are contained in this div
			 * one is a label used to display the attribute name
			 * another is component or plain text displaying.
			 * So, for a single attribute, there properties should be difine:
			 * 1. id - number
			 * 2. name - attribute identity
			 * 3. desc - display name
			 * 4. type - text/number/date/list/multi-list
			 * 5. length(for text)
			 * 6. range(for number)
			 * 7. element type - input/textarea/datepicker/select2/multi-select/......
			 * 8. default value
			 *
			 */
            var mock_attr = [{
                'id' : 1000,
                'name' : 'role_name',
                'desc' : 'Name',
                'type' : 'text',
                'element_type' : 'input'
            }, {
                'id' : 1001,
                'name' : 'role_desc',
                'desc' : 'Description',
                'type' : 'text',
                'element_type' : 'textarea'
            }]; 
            
            var self = this;
            _.each(mock_attr, function(attr) {
                var attr_line_container = $('<div class="form-group">');
                var attr_right_col_container = $('<div class="col-sm-6">');
                attr_line_container.append(self.createLabel(attr.desc));
                attr_line_container.append(attr_right_col_container.append(self.createElement(attr)));
                pageForm.append(attr_line_container);
            });
		},
        
        createLabel: function(desc) {
            return $('<label class="col-sm-3 control-label">').text(desc);
        },
        
		createElement : function(options) {
			var element = null;
			if (options.type === 'text')
                element = $("<p class='control-label' style='text-align:left'>").text(this.model.get(options.name));
            return element;
		},

		afterRender : function() {
			componentFacade.init_switch('.switch');
		}
	});

	roleGeneralInfo.mixin(genericInfoViewMixin);
	module.exports = roleGeneralInfo;
});
