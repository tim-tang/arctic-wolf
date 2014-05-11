seajs.production = false;
if (seajs.production) {
    seajs.config({
        //TODO: handling production environment.
    });
}

seajs.config({
    paths: {
        "wolf-app": "http://localhost:3000/wolf-app"
    },
    alias: {

        // ------------------------------------------//
        //          SPM Legacy Sources               //
        // ------------------------------------------//
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
        "bt-touchspin": "bootstrap.touchspin/bootstrap-touchspin/bootstrap.touchspin.js",

        // ------------------------------------------//
        //               SPM Sources                 //
        // ------------------------------------------//
        //"$": "jquery/jquery/1.10.1/jquery",
        //"$-debug": "jquery/jquery/1.10.1/jquery-debug",
        //"jquery": "jquery/jquery/1.10.1/jquery",
        //"jquery-debug": "jquery/jquery/1.10.1/jquery-debug",
        //"underscore": "gallery/underscore/1.5.2/underscore",
        //"underscore-debug": "gallery/underscore/1.5.2/underscore-debug",
        //"backbone": "gallery/backbone/1.1.0/backbone",
        //"backbone-debug": "gallery/backbone/1.1.0/backbone-debug",
        //"nanoscroller": "jquery-plugin/nanoscroller/0.7.5/nanoscroller.js",
        //"jquery-datatables": "jquery/datatables/1.9.4/datatables",
        ////"datetimepicker": "jquery-plugin/bootstrap-datetimepicker/1.0.0/datetimepicker.js",
        ////"switch": "atans/bootstrap-switch/2.0.0/bootstrap-switch-debug.js",
        //"sparkline": "seedit/sparkline/0.0.1/sparkline.js",
        ////"bootstrap-slider": "gumutianqi/bootstrap-slider/2.0.0/bootstrap-slider-debug.js",
        //"bootstrap": "gallery/bootstrap/3.0.0/bootstrap.js",
        //"moment": "gallery/moment/2.6.0/moment.js",
        //"layoutmanager": "arctic-cmd-repo/backbone-layoutmanager/0.9.5/backbone.layoutmanager-debug.js",
        //"subroute": "arctic-cmd-repo/backbone-subroute/0.4.2/backbone.subroute.js",
        //"select2": "arctic-cmd-repo/jquery-select2/3.4.6/select2.js",
        //"jasny": "arctic-cmd-repo/bootstrap-jasny/3.1.0/jasny-bootstrap.js",
        //"daterangepicker": "arctic-cmd-repo/bootstrap-daterangepicker/1.3.6/daterangepicker.js",
        //"bt-touchspin": "arctic-cmd-repo/bootstrap-touchspin/2.8.0/bootstrap.touchspin.js",
        //"multi-select": "arctic-cmd-repo/jquery-multi-select/0.9.10/jquery.multi-select.js",
        //"datatables": "arctic-cmd-repo/datatables/0.0.1/bootstrap-adapter/js/datatables.js",
        //"html5shiv": "gallery/html5shiv/3.7.0/html5shiv.js",
        //"parsley": "arctic-cmd-repo/parsley/2.0.0/parsley.js",
        ////TODO: Make following lib cmdize
        //"parsley": "wolf-app/sea-modules/jquery.parsley/2.0.0/parsley.js",
        //"quicksearch": "wolf-app/sea-modules/jquery.quicksearch/jquery.quicksearch.js",
        //"datetimepicker": "wolf-app/sea-modules/bootstrap.datetimepicker/js/bootstrap-datetimepicker.min.js",
        //"bootstrap-slider": "wolf-app/sea-modules/bootstrap.slider/js/bootstrap-slider.js",
        //"switch": "wolf-app/sea-modules/bootstrap.switch/bootstrap-switch.min.js",
        //"gritter": "wolf-app/sea-modules/jquery.gritter/js/jquery.gritter.js",
        //"modalEffects": "wolf-app/sea-modules/jquery.niftymodals/js/jquery.modalEffects.js",
        // --------------------------------------- //
        //          ARCTIC WOLF MODULES            //
        // --------------------------------------- //
        "app-core": "wolf-app/app-core/index.js",
        "app-common": "wolf-app/app-common/index.js",
        "app-security": "wolf-app/security/index.js",
        "app-layout": "wolf-app/layout/index.js",
        "app-dashboard": "wolf-app/dashboard/index.js",
        "app-user-mgmt": "wolf-app/user-mgmt/index.js",
        "app-user-group-mgmt": "wolf-app/user-group-mgmt/index.js",
        "app-criteria-mgmt": "wolf-app/criteria-mgmt/index.js",
        "app-privilege-mgmt": "wolf-app/privilege-mgmt/index.js",
        "app-role-mgmt": "wolf-app/role-mgmt/index.js",
        "app-vehicle-mgmt": "wolf-app/vehicle-mgmt/index.js",
        "app-generic-filter": "wolf-app/generic-filter/index.js",
        "app-main": "wolf-app/app-main/index.js"
    },

    debug: true,
    charset: 'utf-8'
});
