define(function(require, exports, module) {

    var $ = require('$');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');
    var componentFacade = require('../../../common/component-facade');

	var roleModel = require('../../model/role-model');
	var userColl = require('../../../user-mgmt/collection/user-coll');

    var roleUser = BaseView.extend({

        prefix: "role-mgmt/templates/tab/",
        
        datatable_id: 'assigned-users-datatable',

        template: 'role-user.html',

		model: new roleModel(),
		
		collection: userColl,

        initialize: function() {
            this.model.urlRoot = '/role-users';
        },

		load_object: function() {
            console.log(this.model.toJSON());
            
            // var privs = this.model.get('privileges')['aaData'];
            
            var self = this;
            // initialze jquery datatable
            componentFacade.init_datatable(this.datatable_id, {
                data: this.model.get('users')['aaData'],
                header: this.model.get('users')['aoColumns']
            }, function(datatable) {
                self.datatable = datatable;
                $('#' + self.datatable_id).on('click', 'tbody tr', function(e) {
                    $(this).toggleClass('row_selected');
                    var selectedId = $(this).find("td:first").html().trim();
                    var model = self.collection.get(selectedId);
                    model.toggle_select();
                });
                eventBus.trigger('hide-loading');
            });
        },
        
        events: {
			//TODO:
        },

        afterRender: function() {
			//TODO:
        }
    });

	roleUser.mixin(objDetailsViewMixin);

    module.exports = roleUser;
});
