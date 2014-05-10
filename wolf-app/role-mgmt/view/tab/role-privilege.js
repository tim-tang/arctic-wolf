define(function(require, exports, module) {

    var $ = require('$');
	var _ = require('underscore');

    var appCommon = require('../../../app-common/app-common-index');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
    var eventBus = require('../../../app-core/app-core-index').Eventbus;
    var componentFacade = appCommon.ComponentFacade;

    var roleModel = require('../../model/role-model');
    var privilegeColl = require('../../../privilege-mgmt/collection/privilege-coll');

    var rolePrivilge = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",

        datatable_id: 'assigned-privileges-datatable',

        template: 'role-privilege.html',

		model: new roleModel(),

		collection: privilegeColl,

        initialize: function() {
            this.model.urlRoot = '/role-privileges';

            // This trigger is used to reverse control multi selector data in assign-privilege-modal
			eventBus.on('set_selected_privileges', this.setSelectedPrivileges, this);
        },

		load_object: function() {
			this.collection.set(this.model.get('privileges')['aaData']);
        	this.init_datatable('privileges');
       	},

		// This trigger method is used to reverse control assign-privilege-modal
		setSelectedPrivileges: function(view) {
			console.log(view.privileges);
			console.log(this.collection);
			var coll = this.collection;
			_.each(view.privileges.optgroups, function(optgroup) {
				_.each(optgroup.options, function(option) {
					console.log(">>>>>>>>>>>"+ option.value);
					//console.log(coll.get(option.value));
					if(coll.get(option.value))
						console.log(option.value);
				});
			});
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
