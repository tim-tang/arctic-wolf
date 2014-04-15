define(function(require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');

    var eventBus = {};
    _.extend(eventBus, Backbone.Events);

    module.exports = eventBus;
});
