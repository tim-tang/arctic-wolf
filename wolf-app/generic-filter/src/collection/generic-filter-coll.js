define(function(require, exports, module) {

    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var componentFactory = require('app-common').GenericComponentFactory;
    
    var genericFilterColl = Backbone.Collection.extend({

        url: '/generic-filter',

        parse: function(resp) {
            componentFactory.makeBulkComponent(resp.component_settings);
        }
    });

    module.exports = new genericFilterColl();
});
