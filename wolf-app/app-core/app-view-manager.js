define(function(require, exports, module) {
    var $ = require('$');
    var transition = require('./app-transition');

    var viewManager = (function() {
        var currentView;
        var layoutView;
        var TRANSITION_TYPE = 'fadeOutRight';

        function showView(selector, view) {
            disposeView(currentView, function() {
				if(view.$el) {
                	view.$el.removeClass('animated ' + TRANSITION_TYPE);
                	render(selector, view, null);
				}
            });
        }

        function showLayoutView(selector, view, callback) {
            disposeView(currentView, function() {
                view.$el.removeClass('animated ' + TRANSITION_TYPE);
                render(selector, view, callback);
            });
        }

        function showLoginView(selector, view) {
            disposeView(layoutView, function() {
                view.$el.removeClass('animated ' + TRANSITION_TYPE);
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
            if (selector == '#security-container') {
                if (!$(selector).exists()) {
                    $('<div id="security-container"></div>').appendTo('#main-body');
                }
                $('#main-body').addClass('texture');
            }

            if (selector == '#layout-container') {
                if (!$(selector).exists()) {
                    $('<div id="layout-container"></div>').appendTo('#main-body');
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
    })();

    module.exports = viewManager;
});
