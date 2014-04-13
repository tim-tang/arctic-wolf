define(function(require, exports, module){

    var Backbone = require('backbone');

    var userGroupRouter = Backbone.Router.extend({
        routers: {
            'user-group-new': 'newUserGroup'
        },

        newUserGroup: function() {
            alert('#####');
        }
    });

    module.exports = userGroupRouter;
});
