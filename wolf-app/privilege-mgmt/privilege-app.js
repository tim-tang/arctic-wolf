 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var privilegeMgmt = require('./view/privilege-mgmt');
	var privilegeModal = require('./view/privilege-new-modal');

	var privilegeApp = new Backbone.Layout({

		el: '#main-content',

        manage: true,

        keep: true,

        prefix: "privilege-mgmt/templates/",

        template: 'privilege-container.html',

	    events: {
            //TODO:
        },

        afterRender: function() {
            this.insertView('#privilege-home', new privilegeMgmt()).render();
		 	this.insertView('#privilege-home', new privilegeModal()).render();
        }
    });
    module.exports = privilegeApp;
 });
