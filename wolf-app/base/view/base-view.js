define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var backboneViewExtension = require('../mixin/backbone-view-extension');

    var eventBus = require('../../app-main/app-eventbus');

    var baseView = Backbone.View.extend({

        manage: true,

        show_loading: function() {
            eventBus.trigger('show-loading');
        },

        hide_loading: function() {
            eventBus.trigger('hide-loading');
        },
    }, {
        mixin: backboneViewExtension.mixin
    });

    module.exports = baseView;
});
