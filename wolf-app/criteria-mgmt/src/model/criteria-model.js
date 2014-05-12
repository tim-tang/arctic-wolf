 define(function(require, exports, module){

    var Backbone = require('backbone');

    var criteriaModel = Backbone.Model.extend({

        urlRoot: '/criterias',
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;

        //},

        defaults: {
            cri_name: '',
            cri_desc: '',
            obj_type: '',
            enabled: '',
            is_selected: false
        },

        // set is_selected attribute status.
        toggle_select: function() {
            this.set({is_selected: !this.get('is_selected')});
        }
    });

    module.exports = criteriaModel;
 });
