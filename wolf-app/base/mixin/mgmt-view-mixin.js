define(function(require, exports, module) {

    var mgmtViewMixin = {

        initialize: function() {
            this.listenTo(this.collection, 'request',this.show_loading);
            this.listenTo(this.collection, 'remove', this.hide_loading);
            this.listenTo(this.collection, 'sync', this.load_objects);
        }
    };

    module.exports = mgmtViewMixin;
});
