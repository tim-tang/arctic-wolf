define(function(require, exports, module) {
    var transition = {

        apply: function(el, callback){
            el.fadeIn(1, callback);
        }
    }

    module.exports = transition;
});
