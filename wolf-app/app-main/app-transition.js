define(function(require, exports, module) {
    var transition = {

        duration: 700,

        apply: function(el, transitionType, callback){
                var transitionClass = 'animated ' + transitionType;
                el.addClass(transitionClass);
                setTimeout(callback, this.duration);
        }
    }

    module.exports = transition;
});
