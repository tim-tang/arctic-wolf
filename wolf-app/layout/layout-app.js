define(function(require, exports, module) {

    //- Import dependency css
    require('css-bootstrap');
    require('css-gritter');
    require('css-font-awesome');
    require('css-nanoscroller');
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
    var Backbone = require('backbone');
    var appRouter = require('./router/layout-router');

    var layout_menu = require('./layout-menu');
    var product_main = require('../product/product-main');
    var user_main = require('../user/user-main');
    var user_group_main = require('../user-group/user-group-main');
    //var vehicle_main = require('../vehicle/vehicle-main');
    var role_main = require('../role/role-main');
    var criteria_main = require('../criteria/criteria-main');
    var privilege_main = require('../privilege/privilege-main');

    // private method to filter out optimized page.
    var ready_optimized_page = function(uri) {

            layout_menu.ready_navigation_menu();

            switch (uri) {
            case "/product-search":
                product_main.ready_product_search();
                break;
            case "/user-mgmt":
                user_main.ready_user_mgmt();
                break;
            case "/user-group-mgmt":
                user_group_main.ready_user_group_mgmt();
                break;
            case "/role-mgmt":
                role_main.ready_role_mgmt();
                break;
            case "/role-details":
                role_main.ready_role_details();
                break;
            case "/privilege-mgmt":
                privilege_main.ready_privilege_mgmt();
                break;
            case "/privilege-details":
                privilege_main.ready_privilege_details();
                break;
            case "/criteria-mgmt":
                criteria_main.ready_criteria_mgmt();
                criteria_main.ready_object_attrs_selectors();
                break;
            case "/criteria-details":
                criteria_main.ready_criteria_details();
                break;
            case "/vehicle-mgmt":
                vehicle_main.ready_vehicle_mgmt();
                break;
            }
        };

    module.exports = {

        init: function() {
            // Set the app namespace instancing the router
            var App = {
                ROOT: "/",
                router: new appRouter()
            };
            // Start the Backbone push navigation
            Backbone.history.start({
                root: App.ROOT,
                pushState: true,
                hashChange: true
            });
        }
    };
});
