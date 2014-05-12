define(function(require, exports, module) {

    var $ = require('$');
    
    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;

    var commonUtils = appCommon.CommonUtils;
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
        },

		load_object: function() {
			this.collection.set(this.model.get('privileges')['aaData']);
        	this.init_datatable('privileges');
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
