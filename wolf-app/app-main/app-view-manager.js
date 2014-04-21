define(function(require, exports, module) {
    var $ = require('$');
    var transition = require('./app-transition');

    var viewManager = (function() {
        var currentView;

        function showView(view) {
            disposeView(currentView, function() {
                render(view);
            });
        }

        function disposeView(view, callback) {
            if (!view) {
                return callback();
            }

            return transition.apply(view.$el, function() {
                _disposeView(view);
                return callback();
            });

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
