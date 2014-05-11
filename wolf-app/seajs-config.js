seajs.config({
    paths: {
        "wolf-app": "http://localhost:3000/wolf-app"
    },
    alias: {
        "$": "jquery/jquery/1.10.1/jquery.js",
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
