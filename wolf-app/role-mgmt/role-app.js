 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var roleMgmt = require('./view/role-mgmt');
	var roleModal = require('./view/modal/role-new-modal');

	var roleApp = new Backbone.Layout({

		//el: '#main-content',

        manage: true,

        keep: true,

        prefix: "role-mgmt/templates/",

        template: 'role-container.html',

	    events: {
            //TODO:
        },

        afterRender: function() {
            this.insertView('#role-home', new roleMgmt()).render();
		 	this.insertView('#role-home', new roleModal()).render();
        }
    });
    module.exports = roleApp;
 });
