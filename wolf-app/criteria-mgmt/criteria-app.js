 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var criteriaMgmt = require('./view/criteria-mgmt');
	var criteriaModal = require('./view/criteria-new-modal');

	var criteriaApp = new Backbone.Layout({

		el: '#main-content',

        manage: true,

        keep: true,

        prefix: "criteria-mgmt/templates/",

        template: 'criteria-container.html',

	    events: {
            //TODO:
        },

        afterRender: function() {
            this.insertView('#criteria-home', new criteriaMgmt()).render();
		 	this.insertView('#criteria-home', new criteriaModal()).render();
        }
    });
    module.exports = criteriaApp;
 });
