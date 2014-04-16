 define(function(require, exports, module) {

	var $ = require('$');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var userMgmt = require('./view/user-mgmt');
	var userModal = require('./view/user-new-modal');

	var userApp = new Backbone.Layout({

		el: '#main-content',

        manage: true,

        keep: true,

        prefix: "user-mgmt/templates/",

        template: 'user-container.html',

	    events: {
            //TODO:
        },

        afterRender: function() {
            this.insertView('#user-home', new userMgmt()).render();
		 	this.insertView('#user-home', new userModal()).render();
        }
    });
    module.exports = userApp;
 });
