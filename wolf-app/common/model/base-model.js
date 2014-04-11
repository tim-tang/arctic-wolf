define(function(require, exports, module) {

    var Backbone = require('backbone');

    var baseModel = Backbone.Model.extend({
        //TODO: extract to constants
        urlRoot: 'http://localhost:5000'
    });

    module.exports = baseModel;
});
