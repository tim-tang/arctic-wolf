 define(function(require, exports, module){

    var Backbone = require('backbone');

    var userModel = Backbone.Model.extend({

        urlRoot: '/users',
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;

        //},

        defaults: {
            u_name: '',
            u_desc: '',
            u_email: '',
            enabled: '',
            is_selected: false
        },

        // set is_selected attribute status.
        toggle_select: function() {
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = userModel;
 });
