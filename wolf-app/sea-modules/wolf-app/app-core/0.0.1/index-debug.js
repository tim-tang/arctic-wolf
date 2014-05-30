define("wolf-app/app-core/0.0.1/index-debug", [ "./app-view-manager-debug", "$-debug", "./app-transition-debug", "./app-eventbus-debug", "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    module.exports.ViewMgmt = require("./app-view-manager-debug");
    module.exports.Eventbus = require("./app-eventbus-debug");
});

define("wolf-app/app-core/0.0.1/app-view-manager-debug", [ "$-debug", "wolf-app/app-core/0.0.1/app-transition-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var transition = require("wolf-app/app-core/0.0.1/app-transition-debug");
    var viewManager = function() {
        var currentView;
        var layoutView;
        var TRANSITION_TYPE = "fadeOutRight";
        function showView(selector, view) {
            disposeView(currentView, function() {
                if (view.$el) {
                    view.$el.removeClass("animated " + TRANSITION_TYPE);
                    render(selector, view, null);
                }
            });
        }
        function showLayoutView(selector, view, callback) {
            disposeView(currentView, function() {
                view.$el.removeClass("animated " + TRANSITION_TYPE);
                render(selector, view, callback);
            });
        }
        function showLoginView(selector, view) {
            disposeView(layoutView, function() {
                view.$el.removeClass("animated " + TRANSITION_TYPE);
                render(selector, view, null);
            });
        }
        function discardLayoutView() {
            if (layoutView && layoutView.retain) {
                layoutView.retain = false;
            }
        }
        function disposeView(view, callback) {
            // view not exists or layout view render directly.
            if (!view || view.retain) {
                return callback();
            }
            return applyTransition(view.$el, TRANSITION_TYPE, function() {
                view.remove();
                return callback();
            });
            function applyTransition(el, name, callback) {
                if (!name) {
                    return callback();
                }
                return transition.apply(el, name, callback);
            }
        }
        function render(selector, view, callback) {
            if (view.retain) {
                layoutView = view;
            }
            currentView = view;
            if (selector == "#security-container") {
                if (!$(selector).exists()) {
                    $('<div id="security-container"></div>').appendTo("#main-body");
                }
                $("#main-body").addClass("texture");
            }
            if (selector == "#layout-container") {
                if (!$(selector).exists()) {
                    $('<div id="layout-container"></div>').appendTo("#main-body");
                }
            }
            $(selector).html(currentView.el).hide().fadeIn();
            currentView.render().promise().done(function() {
                if (!callback) {
                    return;
                }
                callback();
            });
        }
        return {
            show: showView,
            showLayout: showLayoutView,
            showLogin: showLoginView,
            discardLayout: discardLayoutView
        };
    }();
    module.exports = viewManager;
});

define("wolf-app/app-core/0.0.1/app-transition-debug", [], function(require, exports, module) {
    var transition = {
        duration: 700,
        apply: function(el, transitionType, callback) {
            var transitionClass = "animated " + transitionType;
            el.addClass(transitionClass);
            setTimeout(callback, this.duration);
        }
    };
    module.exports = transition;
});

define("wolf-app/app-core/0.0.1/app-eventbus-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var eventBus = {};
    _.extend(eventBus, Backbone.Events);
    module.exports = eventBus;
});
