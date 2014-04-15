 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var userGroupMgmt = require('./view/user-group-mgmt');
	var userGroupModal = require('./view/user-group-new-modal');

	var userGroupApp = new Backbone.Layout({

		el: '#main-content',

        manage: true,

        keep: true,

        prefix: "user-group-mgmt/templates/",

        template: 'user-group-container.html',

	    events: {
            //TODO:
        },

        afterRender: function() {
            this.insertView('#user-group-home', new userGroupMgmt()).render();
		 	this.insertView('#user-group-home', new userGroupModal()).render();
        }
    });
    module.exports = userGroupApp;
 });
