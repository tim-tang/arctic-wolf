define(function(require, exports, module) {

    var $ = require('$');
	var _ = require('underscore');
    var BaseView = require('../../../base/view/base-view');
    var objDetailsViewMixin = require('../../../base/mixin/object-details-view-mixin');

    var commonUtils = require('../../../common/common-utils');
    var eventBus = require('../../../app-main/app-eventbus');
    var componentFacade = require('../../../common/component-facade');

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
        },

		load_object: function() {
            console.log(this.model.toJSON());
            
            var privs = this.model.get('privileges')['aaData'];
            
            privs.each
            
            var self = this;
            // initialze jquery datatable
            componentFacade.init_datatable(this.datatable_id, {
                data: this.model.get('privileges')['aaData'],
                header: this.model.get('privileges')['aoColumns']
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

	rolePrivilge.mixin(objDetailsViewMixin);

	module.exports = rolePrivilge;
});
