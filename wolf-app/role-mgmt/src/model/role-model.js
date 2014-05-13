 define(function(require, exports, module){

    var Backbone = require('backbone');

    var roleModel = Backbone.Model.extend({

		idAttribute: 'id',
		
        urlRoot: '/roles',
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;

        //},

        defaults: {
        	id: '',
            role_name: '',
            role_desc: '',
            privileges: '',
            enabled: '',
            is_selected: false
        },

        // Set is_selected attribute status.
        toggle_select: function() {
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = roleModel;
 });