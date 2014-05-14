define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var eventBus = require('app-core').Eventbus;

	var appCommon = require('app-common');
	var commonLoading = appCommon.CommonLoading;
	var genericViewFactory = appCommon.GenericViewFactory;

	var criteriaColl = require('./collection/criteria-coll');
	var criteriaModal = require('./view/criteria-new-modal');

	var criteriaApp = new Backbone.Layout({
		
		manage : true,

		prefix : "criteria-mgmt/src/tpl/",

		template : 'criteria-container.html',

		events : {
			//TODO:
		},

		initialize : function() {
			eventBus.on('show-loading', this.show_loading, this);
			eventBus.on('hide-loading', this.hide_loading, this);
		},

		afterRender : function() {
			var criteriaMgmtView = genericViewFactory.createView('OBJ_MGMT', {
				'collection' : criteriaColl,
				'view_url' : 'criteria-mgmt/view'
			});
			this.insertView('#criteria-home', criteriaMgmtView).render();

			var criteriaModalView = new criteriaModal();
			this.insertView('#criteria-home', criteriaModalView).render();
		},

		show_loading : function() {
			commonLoading.init('#main-content');
		},

		hide_loading : function() {
			commonLoading.destroy();
		},
	});

	module.exports = {
		run : function(viewManager) {
			viewManager.show('#main-content', criteriaApp);
		},

		invokeCriteriaRouter : function() {
			var criteriaRouter = require('./router/criteria-router');
			return new criteriaRouter('criteria-mgmt/', {
				createTrailingSlashRoutes : true
			});
		}
	};
});
