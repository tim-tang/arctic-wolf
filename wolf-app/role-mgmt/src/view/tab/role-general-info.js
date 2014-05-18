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

		pageStatus : 'view',

		initialize : function(options) {
			this.model.urlRoot = '/role-general-info';
		},

		events : {
			//TODO:
		},

		load_object : function() {
			console.log("##################In roleGeneralInfo load_object()");

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
			 * 2. name - text
			 * 3. type - text/number/date/list/multi-list
			 * 4. length(for text)
			 * 5. range(for number)
			 * 6. element type - input/textarea/datepicker/select2/multi-select/......
			 * 7. default value
			 * 8. mode - view/edit
			 *
			 */
			var mock_attr = {
				'name' : 'Text',
				'type' : 'text',
				'element_type' : 'input'
			};

			var attr_line_container = $('<div class="form-group">');
			var attr_label = $('<label class="col-sm-3 control-label">');

			var attr_element = this.createElement({
				'name' : 'Text',
				'type' : 'text',
				'element_type' : 'input'
			});

			$('#name').children().remove();
			$('#desc').children().remove();
			var name = $("<p class='control-label' style='text-align:left'>").text(this.model.get('role_name'));
			var desc = $("<p class='control-label' style='text-align:left'>").text(this.model.get('role_desc'));
			$('#name').append(name);
			$('#desc').append(desc);
		},

		createElement : function(optins) {
			if (options.type === 'text')

		},

		afterRender : function() {
			componentFacade.init_switch('.switch');
		}
	});

	roleGeneralInfo.mixin(genericInfoViewMixin);
	module.exports = roleGeneralInfo;
});
