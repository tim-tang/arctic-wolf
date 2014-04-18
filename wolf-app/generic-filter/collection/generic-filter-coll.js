define(function(require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');
    var componentFacade = require('../../common/component-facade');
    var genericFilterColl = Backbone.Collection.extend({

        url: App.WS_HOST + '/generic-filter',


        parse: function(resp){
            componentFacade.init_by_component_settings(resp.component_settings);
        }

    });

    module.exports = new genericFilterColl();
});
