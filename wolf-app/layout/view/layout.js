define(function(require, exports, module) {

    var Backbone = require('backbone');
    var layoutLogo = require('./layout-logo');
    var layoutUser = require('./layout-user');
    var layoutMenu = require('./layout-menu');
    var layoutProfile = require('./layout-profile');

    var layout = Backbone.View.extend({

        manage: true,

        template: 'layout/templates/layout.html',

        afterRender: function(){
            this.insertView('#layout-logo-user-menu', new layoutLogo()).render();
            this.insertView('#layout-logo-user-menu', new layoutUser()).render();
            this.insertView('#layout-logo-user-menu', new layoutMenu()).render();
            this.insertView('#layout-profile', new layoutProfile()).render();
        }
    });

    module.exports = layout;
});
