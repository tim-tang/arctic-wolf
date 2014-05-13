seajs.production = false;

// -- configuration for dependency js libs.
seajs.config({
    alias: {

        // ----------------------------------------------------------//
        //                      SPM Legacy Sources                   //
        // ----------------------------------------------------------//
        "$": "jquery/jquery/1.10.1/jquery.js",
        "jquery": "jquery/jquery/1.10.1/jquery.js",
        "$-debug": "jquery/jquery/1.10.1/jquery-debug.js",
        "jquery-debug": "jquery/jquery/1.10.1/jquery-debug.js",
        "underscore": "underscore/1.4.4/underscore-debug.js",
        "backbone": "backbone/1.0.0/backbone-debug.js",
        "layoutmanager": "backbone.layoutmanager/0.9.5/backbone.layoutmanager.js",
        "subroute": "backbone.subroute/0.4.2/backbone.subroute.js",
        "nanoscroller": "jquery.nanoscroller/jquery.nanoscroller.js",
        "sparkline": "jquery.sparkline/jquery.sparkline.min.js",
        "gritter": "jquery.gritter/js/jquery.gritter.js",
        "quicksearch": "jquery.quicksearch/jquery.quicksearch.js",
        "moment": "bootstrap.daterangepicker/moment.min.js",
        "daterangepicker": "bootstrap.daterangepicker/daterangepicker.js",
        "datetimepicker": "bootstrap.datetimepicker/js/bootstrap-datetimepicker.min.js",
        "select2": "jquery.select2/select2.min.js",
        "bootstrap-slider": "bootstrap.slider/js/bootstrap-slider.js",
        "modalEffects": "jquery.niftymodals/js/jquery.modalEffects.js",
        "jquery-datatables": "jquery.datatables/jquery.datatables.min.js",
        "datatables": "jquery.datatables/bootstrap-adapter/js/datatables.js",
        "jasny": "jasny.bootstrap/extend/js/jasny-bootstrap.min.js",
        "parsley": "jquery.parsley/2.0.0/parsley.js",
        "switch": "bootstrap.switch/bootstrap-switch.min.js",
        "multi-select": "jquery.multiselect/js/jquery.multi-select.js",
        "bootstrap": "bootstrap/dist/js/bootstrap.min.js",
        "bt-touchspin": "bootstrap.touchspin/bootstrap-touchspin/bootstrap.touchspin.js"
    },
    debug: true,
    charset: 'utf-8'
});

// -- configuration for dependency cmdized js libs.
//seajs.config({
//        // -------------------------------------------------------------//
//        //                         SPM CMD Sources                      //
//        // -------------------------------------------------------------//
//        "$": "jquery/jquery/1.10.1/jquery",
//        "$-debug": "jquery/jquery/1.10.1/jquery-debug",
//        "jquery": "jquery/jquery/1.10.1/jquery",
//        "jquery-debug": "jquery/jquery/1.10.1/jquery-debug",
//        "underscore": "gallery/underscore/1.5.2/underscore",
//        "underscore-debug": "gallery/underscore/1.5.2/underscore-debug",
//        "backbone": "gallery/backbone/1.1.0/backbone",
//        "backbone-debug": "gallery/backbone/1.1.0/backbone-debug",
//        "nanoscroller": "jquery-plugin/nanoscroller/0.7.5/nanoscroller.js",
//        "jquery-datatables": "jquery/datatables/1.9.4/datatables",
//        //"datetimepicker": "jquery-plugin/bootstrap-datetimepicker/1.0.0/datetimepicker.js",
//        //"switch": "atans/bootstrap-switch/2.0.0/bootstrap-switch-debug.js",
//        "sparkline": "seedit/sparkline/0.0.1/sparkline.js",
//        //"bootstrap-slider": "gumutianqi/bootstrap-slider/2.0.0/bootstrap-slider-debug.js",
//        "bootstrap": "gallery/bootstrap/3.0.0/bootstrap.js",
//        "moment": "gallery/moment/2.6.0/moment.js",
//        "layoutmanager": "arctic-cmd-repo/backbone-layoutmanager/0.9.5/backbone.layoutmanager-debug.js",
//        "subroute": "arctic-cmd-repo/backbone-subroute/0.4.2/backbone.subroute.js",
//        "select2": "arctic-cmd-repo/jquery-select2/3.4.6/select2.js",
//        "jasny": "arctic-cmd-repo/bootstrap-jasny/3.1.0/jasny-bootstrap.js",
//        "daterangepicker": "arctic-cmd-repo/bootstrap-daterangepicker/1.3.6/daterangepicker.js",
//        "bt-touchspin": "arctic-cmd-repo/bootstrap-touchspin/2.8.0/bootstrap.touchspin.js",
//        "multi-select": "arctic-cmd-repo/jquery-multi-select/0.9.10/jquery.multi-select.js",
//        "datatables": "arctic-cmd-repo/datatables/0.0.1/bootstrap-adapter/js/datatables.js",
//        "html5shiv": "gallery/html5shiv/3.7.0/html5shiv.js",
//        "parsley": "arctic-cmd-repo/parsley/2.0.0/parsley.js",
//        //TODO: Make following lib cmdize
//        "parsley": "wolf-app-path/sea-modules/jquery.parsley/2.0.0/parsley.js",
//        "quicksearch": "wolf-app-path/sea-modules/jquery.quicksearch/jquery.quicksearch.js",
//        "datetimepicker": "wolf-app-path/sea-modules/bootstrap.datetimepicker/js/bootstrap-datetimepicker.min.js",
//        "bootstrap-slider": "wolf-app-path/sea-modules/bootstrap.slider/js/bootstrap-slider.js",
//        "switch": "wolf-app-path/sea-modules/bootstrap.switch/bootstrap-switch.min.js",
//        "gritter": "wolf-app-path/sea-modules/jquery.gritter/js/jquery.gritter.js",
//        "modalEffects": "wolf-app-path/sea-modules/jquery.niftymodals/js/jquery.modalEffects.js",
//});
// -- configuration for development environment.
seajs.config({
    paths: {
        "wolf-app-path": "http://localhost:3000/wolf-app"
    },

    alias: {
        // --------------------------------------------------------- //
        //                   ARCTIC WOLF MODULES                     //
        // --------------------------------------------------------- //
        "app-core": "wolf-app-path/app-core/src/index.js",
        "app-common": "wolf-app-path/app-common/src/index.js",
        "app-security": "wolf-app-path/security/src/index.js",
        "app-layout": "wolf-app-path/layout/src/index.js",
        "app-dashboard": "wolf-app-path/dashboard/src/index.js",
        "app-user-mgmt": "wolf-app-path/user-mgmt/src/index.js",
        "app-user-group-mgmt": "wolf-app-path/user-group-mgmt/src/index.js",
        "app-criteria-mgmt": "wolf-app-path/criteria-mgmt/src/index.js",
        "app-privilege-mgmt": "wolf-app-path/privilege-mgmt/src/index.js",
        "app-role-mgmt": "wolf-app-path/role-mgmt/src/index.js",
        "app-vehicle-mgmt": "wolf-app-path/vehicle-mgmt/src/index.js",
        "app-generic-filter": "wolf-app-path/generic-filter/src/index.js",
        "app-main": "wolf-app-path/app-main/src/index.js"
    }
});

// -- configuration for production environment.
/*map start*/
if (seajs.production) {
    seajs.config({
        alias: {
            "wolf-tpl": "wolf-app/wolf-tpl/src/wolf-tpl.js"
        },
        map: [
            ["wolf-app-path/app-core/src/index-debug.js", "wolf-app/app-core/index-debug-80fd52afdbc1074d6b7367ed64a7dc0d.js"],
            ["wolf-app-path/app-core/src/index.js", "wolf-app/app-core/index-e48a407a09f051c446e1d7d59fdf4a3b.js"],
            ["wolf-app-path/app-common/src/index-debug.js", "wolf-app/app-common/index-debug-f319291285d6228d51a72e86f4c58a24.js"],
            ["wolf-app-path/app-common/src/index.js", "wolf-app/app-common/index-bf37d2ebc59b4466433e53039c607c9d.js"],
            ["wolf-app-path/criteria-mgmt/src/index-debug.js", "wolf-app/criteria-mgmt/index-debug-e0d1b51659891895a408545f17a8a776.js"],
            ["wolf-app-path/criteria-mgmt/src/index.js", "wolf-app/criteria-mgmt/index-85a2f5c2f6f9cf0e89b624ed0fdd51d7.js"],
            ["wolf-app-path/dashboard/src/index-debug.js", "wolf-app/dashboard/index-debug-e80143216e57efff1262c02322a13f49.js"],
            ["wolf-app-path/dashboard/src/index.js", "wolf-app/dashboard/index-fe107eae853dccd53def49bc6a09d6cd.js"],
            ["wolf-app-path/generic-filter/src/index-debug.js", "wolf-app/generic-filter/index-debug-f28e63776af29e460dc005e02d4dee5e.js"],
            ["wolf-app-path/generic-filter/src/index.js", "wolf-app/generic-filter/index-413d24e900f84ab2ff23179c1f1f160e.js"],
            ["wolf-app-path/layout/src/index-debug.js", "wolf-app/layout/index-debug-c5a4248bde653b7a0cf9091fc96b11c8.js"],
            ["wolf-app-path/layout/src/index.js", "wolf-app/layout/index-b4c42c4d82a81b84cf93b4ffb8cb1ec9.js"],
            ["wolf-app-path/privilege-mgmt/src/index-debug.js", "wolf-app/privilege-mgmt/index-debug-08322eb31c7b63e58123bdbc071002e7.js"],
            ["wolf-app-path/privilege-mgmt/src/index.js", "wolf-app/privilege-mgmt/index-d5268c7ad3fabf15cb4314798599b55f.js"],
            ["wolf-app-path/role-mgmt/src/index-debug.js", "wolf-app/role-mgmt/index-debug-c9bf1220b870942bfb92dfca6901dc67.js"],
            ["wolf-app-path/role-mgmt/src/index.js", "wolf-app/role-mgmt/index-023a9e093aab7d2c2d30c8e06f35de08.js"],
            ["wolf-app-path/security/src/index-debug.js", "wolf-app/security/index-debug-08379a1eafe1286cb1af5254b7a580b4.js"],
            ["wolf-app-path/security/src/index.js", "wolf-app/security/index-2ba65af79f67c4113eaf8bd8a2a9d73f.js"],
            ["wolf-app-path/user-group-mgmt/src/index-debug.js", "wolf-app/user-group-mgmt/index-debug-7cb44776277d448ba586bd0f55276249.js"],
            ["wolf-app-path/user-group-mgmt/src/index.js", "wolf-app/user-group-mgmt/index-0727ad6ae26b286e03d54d76f1a1299e.js"],
            ["wolf-app-path/vehicle-mgmt/src/index-debug.js", "wolf-app/vehcile-mgmt/index-debug-93fb673fcecb94c92947c0bcc7ea8bcc.js"],
            ["wolf-app-path/vehicle-mgmt/src/index.js", "wolf-app/vehcile-mgmt/index-90df9eb9ceedaa4d7b4536f345d1af24.js"],
            ["wolf-app-path/app-main/src/index-debug.js", "wolf-app/app-main/index-debug-b44347aea16e8fcda325fb0172f75c89.js"],
            ["wolf-app-path/app-main/src/index.js", "wolf-app/app-main/index-92dbd2142b7d1f815a03630ae034d086.js"],
            ["wolf-app-path/wolf-app/wolf-tpl/wolf-tpl.js", "wolf-app/wolf-tpl/wolf-tpl-fbf9d80c9d323804442986c29878f977.js"]
        ],
        debug: false
    });
}
/*map end*/
