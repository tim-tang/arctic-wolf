define(function(require, exports, module) {
    var $ = require('$');
    var transition = require('./app-transition');

    var viewManager = (function() {
        var currentView;
        var TRANSITION_TYPE = 'bounceOutRight';

        function showView(selector, view) {
            disposeView(currentView, function() {
                view.$el.removeClass('animated ' + TRANSITION_TYPE);
                render(selector, view, null);
            });
        }

        function showLayoutView(selector, view, callback) {
            disposeView(currentView, function() {
                view.$el.removeClass('animated ' + TRANSITION_TYPE);
                render(selector, view, callback);
            });
        }

        function disposeView(view, callback) {
            if (!view || view.layout) {
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

        function render(selector, view, callback) {
            currentView = view;
            if (selector == '#main-body'){
                $(selector).addClass('texture');
            }
            $(selector).html(currentView.el);
            currentView.render().promise().done(function(){
                if(!callback){
                    return;
                }
                callback();
            });
        }

        return {
            show: showView,
            showLayout: showLayoutView
        };
    })();

    module.exports = viewManager;
});
