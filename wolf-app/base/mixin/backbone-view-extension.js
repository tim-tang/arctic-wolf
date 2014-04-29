define(function(require, exports, module) {

    var _ = require('underscore');
    var Backbone = require('backbone');

    var backboneViewExtensions = {

        mixin: function(from) {
            var to = this.prototype;

            // we add those methods which exists on `from` but not on `to` to the latter
            _.defaults(to, from);

            // we do the same for events and triggers
            _.defaults(to.events, from.events);
            _.defaults(to.triggers, from.triggers);

            // we then extend `to`'s `initialize`
            backboneViewExtensions.extendMethod(to, from, "initialize");
            backboneViewExtensions.extendMethod(to, from, "render");
        },

        // Helper method to extend an already existing method
        extendMethod: function(to, from, methodName) {

            // if the method is defined on from ...
            if (!_.isUndefined(from[methodName])) {
                var old = to[methodName];

                // ... we create a new function on to
                to[methodName] = function() {

                    // wherein we first call the method which exists on `to`
                    var oldReturn = old.apply(this, arguments);

                    // and then call the method on `from`
                    from[methodName].apply(this, arguments);

                    // and then return the expected result,
                    return oldReturn;
                };
            }
        }
    };

    module.exports = _.extend(Backbone.View.prototype, backboneViewExtensions);

});
