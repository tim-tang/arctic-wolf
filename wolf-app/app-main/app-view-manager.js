define(function(require, exports, module) {
    var $ = require('$');
    var transition = require('./app-transition');

    var viewManager = (function() {
        var currentView;
        var TRANSITION_TYPE = 'fadeOutRight';

        function showView(view) {
            disposeView(currentView, function() {
                view.$el.removeClass('animated ' + TRANSITION_TYPE);
                render(view);
            });
        }

        function disposeView(view, callback) {
            if (!view) {
                return callback();
            }

            return applyTransition(view.$el, TRANSITION_TYPE, function() {
                _disposeView(view);
                return callback();
            });

            function applyTransition(el, name, callback) {
                if (!name) {
                    return callback();
                }
                return transition.apply(el, name, callback);
            }

            function _disposeView(view) {
                view.subviews && view.subviews.forEach(function(subview) {
                    _disposeView(subview);
                });

                view.remove();
            }
        }

        function render(view) {
            currentView = view;
            $("#main-content").html(currentView.el);
            currentView.render();
        }

        return {
            show: showView
        };
    })();

    module.exports = viewManager;
});
