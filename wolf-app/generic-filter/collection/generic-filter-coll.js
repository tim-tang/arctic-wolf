define(function(require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');
    var genericFilterColl = Backbone.Collection.extend({

        url: App.WS_HOST + '/generic-filter',


        parse: function(resp){
            console.log(resp);
        }

    });

    module.exports = new genericFilterColl();
});
