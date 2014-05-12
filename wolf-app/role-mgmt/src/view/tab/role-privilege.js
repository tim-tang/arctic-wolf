define(function(require, exports, module) {

    var $ = require('$');
	var _ = require('underscore');

    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var eventBus = require('app-core').Eventbus;
    var componentFacade = appCommon.ComponentFacade;

    var roleModel = require('../../model/role-model');
    var privilegeColl = require('app-privilege-mgmt').PrivilegeColl;

    var rolePrivilge = BaseView.extend({

        prefix: "role-mgmt/src/tpl/tab/",

        datatable_id: 'assigned-privileges-datatable',

        template: 'role-privilege.html',

		model: new roleModel(),

		collection: privilegeColl,

        initialize: function() {
            this.model.urlRoot = '/role-privileges';
            this.model.set('id', '888');

            // This trigger is used to reverse control multi selector data in assign-privilege-modal
            console.log("######## Register event: set_selected_privileges");
            eventBus.off('set_selected_privileges');
			eventBus.on('set_selected_privileges', this.setSelectedPrivileges, this);
        },

		load_object: function() {
			this.collection.set(this.model.get('privileges')['aaData']);
        	this.init_datatable('privileges');
       	},

		// This trigger method is used to reverse control assign-privilege-modal
		setSelectedPrivileges: function(view) {
			//console.log(view.privileges);
			//console.log(this.collection);
			var coll = this.collection;
			var selectedOptionsValue = [];
			_.each(view.privileges.optgroups, function(optgroup) {
				_.each(optgroup.options, function(option) {
					//console.log(">>>>>0>>>>>>"+ option.selected);
					if(coll.get(option.value))
						selectedOptionsValue.push(option.value);
					//console.log(">>>>>1>>>>>>"+ option.selected);
				});
			});
			view.privileges.selected = selectedOptionsValue;
			console.log(view.privileges);
			view.renderPrivilegeMultiSelect();
		},

        events: {
			//TODO:
        },

        afterRender: function() {
			//TODO:
        }
    });

	rolePrivilge.mixin(genericDetailsViewMixin);

	module.exports = rolePrivilge;
});
