define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var backboneViewMixin = require('../mixin/backbone-view-mixin');

    var eventBus = require('../../app-core/app-eventbus');

    var baseView = Backbone.View.extend({

        manage: true,

        show_loading: function() {
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },
    }, {
        mixin: backboneViewMixin.mixin
    });

    module.exports = baseView;
});
