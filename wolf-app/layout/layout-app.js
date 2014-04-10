define(function(require, exports, module) {

    require('css-bt-switch');

    //- Import dependency js
    require('jcookie');
    require('nanoscroller');
    require('sparkline');
    require('jquery-ui');
    require('gritter');
    require('behavior-core');
    require('bootstrap');


    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var layout = require('./view/layout');

    var layoutApp = new Backbone.Layout({

        el: '#main-body',

        beforeRender: function(){
            $('#main-body').removeClass('texture');
        },

        views: {
            '': new layout()
        }
    });

    module.exports = layoutApp;
});
