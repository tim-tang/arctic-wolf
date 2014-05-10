 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var appCommon = require('../app-common/app-common-index');
	var commonLoading = appCommon.CommonLoading;

	var eventBus = require('../app-core/app-core-index').Eventbus;

	var criteriaMgmt = require('./view/criteria-mgmt');
	var criteriaModal = require('./view/criteria-new-modal');

	var criteriaApp = new Backbone.Layout({

		//el: '#main-content',

        manage: true,

        prefix: "criteria-mgmt/templates/",

        template: 'criteria-container.html',

	    events: {
            //TODO:
        },

        initialize: function() {
            eventBus.on('show-loading', this.show_loading, this);
            eventBus.on('hide-loading', this.hide_loading, this);
        },

        afterRender: function() {
			var criteriaMgmtView = new criteriaMgmt();
            this.insertView('#criteria-home', criteriaMgmtView).render();

			var criteriaModalView = new criteriaModal();
            this.insertView('#criteria-home', criteriaModalView).render();
        },

		show_loading: function() {
			commonLoading.init('#main-content');
		},

       	hide_loading: function() {
       		commonLoading.destroy();
		},
    });

    module.exports = {
        run: function(viewManager) {
            viewManager.show('#main-content', criteriaApp);
        },

        invokeCriteriaRouter: function() {
            var criteriaRouter = require('./router/criteria-router');
            return new criteriaRouter('criteria-mgmt/', {
                createTrailingSlashRoutes: true
            });
        }
    };
 });
