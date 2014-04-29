define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    // var Backbone = require('backbone');
    var BaseMgmtView = require('../../base/view/base-mgmt-view');

    var commonUtils = require('../../common/common-utils');
    var componentFacade = require('../../common/component-facade');
    var eventBus = require('../../app-main/app-eventbus');

	var vehicleColl = require('../collection/vehicle-coll');

    var vehicleMgmt = BaseMgmtView.extend({

        prefix: "vehicle-mgmt/templates/",

        template: 'vehicle-mgmt.html',

        datatable_id: 'vehicle-mgmt-datatable',

        collection: vehicleColl,

        //initialize: function() {
        //    this.listenTo(vehicleColl, 'request',this.show_loading);
        //    this.listenTo(vehicleColl, 'remove', this.hide_loading);
        //    this.listenTo(vehicleColl, 'sync', this.load_objects);
        //},

        afterRender: function() {
            // waiting for all vehicle mgmt dom element ready.
            // then build datatable.
            vehicleColl.fetch();
        },

        load_objects: function() {
			//this.constructor.__super__.load_objects(this);

			self = this;
			// Inital Datatable
			componentFacade.init_datatable(this.datatable_id, {data: vehicleColl.toJSON(), header: vehicleColl.columns}, function(datatable) {
				self.datatable = datatable;
				$(this.datatable_id).on('click', 'tbody tr', function(e) {
					$(this).toggleClass('row_selected');
					var selected_id = $(this).find("td:first").html().trim();
					var model = vehicleColl.get(selected_id);
					model.toggle_select();
				});
				eventBus.trigger('hide-loading');
			});
		}
    });

    module.exports = vehicleMgmt;
});
