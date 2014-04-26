 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var roleTabs = require('./view/role-tabs');

	var roleDetailsApp = new Backbone.Layout({

		el: '#main-content',

        manage: true,

        prefix: "role-mgmt/templates/",

        template: 'role-details.html',

	    events: {
            //TODO:
        },

        afterRender: function() {
            //this.insertView('#role-home', new roleMgmt()).render();
		 	//this.insertView('#role-home', new roleModal()).render();
		 	this.insertView('#tab-container', new roleTabs()).render();
        }
    });
    module.exports = roleDetailsApp;
 });
