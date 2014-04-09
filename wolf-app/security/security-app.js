define(function(require, exports, module) {
    //- Import dependency css
    require('css-bootstrap');
    require('css-gritter');
    require('css-font-awesome');
    require('css-nanoscroller');
    require('css-general');

    var Backbone = require('backbone');
    var securityLogin = require('./view/security-login');

    var securityApp =new Backbone.Layout({

        el: '#main-body',

        views: {
            '': new securityLogin()
        },

    });

    module.exports = securityApp;
});
