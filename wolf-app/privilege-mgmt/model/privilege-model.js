 define(function(require, exports, module){

    var Backbone = require('backbone');

    var privilegeModel = Backbone.Model.extend({

        urlRoot: App.WS_HOST + '/privileges',
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;

        //},

        defaults: {
            priv_name: '',
            priv_desc: '',
            priv_type: '',
            criteria: '',
            enabled: '',
            is_selected: false
        },

        // set is_selected attribute status.
        toggle_select: function() {
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = privilegeModel;
 });
