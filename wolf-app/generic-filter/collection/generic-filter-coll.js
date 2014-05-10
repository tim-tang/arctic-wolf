define(function(require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');
    var componentFacade = require('../../app-common/component-facade');
    var genericFilterColl = Backbone.Collection.extend({

        url: '/generic-filter',


        parse: function(resp){
            componentFacade.init_by_component_settings(resp.component_settings);
        }
    });

    module.exports = new genericFilterColl();
});
