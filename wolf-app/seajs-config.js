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
/*production start*/
if(seajs.production){
    seajs.config({
        alias: {
	"app-core-debug": "wolf-app/app-core/0.0.1/index-debug-80fd52afdbc1074d6b7367ed64a7dc0d.js",
	"app-core": "wolf-app/app-core/0.0.1/index-e48a407a09f051c446e1d7d59fdf4a3b.js",
	"app-common-debug": "wolf-app/app-common/0.0.1/index-debug-72a586e749b82836baf9bddb582a962b.js",
	"app-common": "wolf-app/app-common/0.0.1/index-bb4216d39af4a6c7be39f6325954c7b8.js",
	"app-security-debug": "wolf-app/security/0.0.1/index-debug-08379a1eafe1286cb1af5254b7a580b4.js",
	"app-security": "wolf-app/security/0.0.1/index-2ba65af79f67c4113eaf8bd8a2a9d73f.js",
	"app-layout-debug": "wolf-app/layout/0.0.1/index-debug-c5a4248bde653b7a0cf9091fc96b11c8.js",
	"app-layout": "wolf-app/layout/0.0.1/index-b4c42c4d82a81b84cf93b4ffb8cb1ec9.js",
	"app-dashboard-debug": "wolf-app/dashboard/0.0.1/index-debug-e80143216e57efff1262c02322a13f49.js",
	"app-dashboard": "wolf-app/dashboard/0.0.1/index-fe107eae853dccd53def49bc6a09d6cd.js",
	"app-user-mgmt-debug": "wolf-app/user-mgmt/0.0.1/index-debug-a5f3828ff592bc1aa41512606bbd02ac.js",
	"app-user-mgmt": "wolf-app/user-mgmt/0.0.1/index-ce0fbaf0b81bf6fcbb49891f3ae4c8f6.js",
	"app-user-group-mgmt-debug": "wolf-app/user-group-mgmt/0.0.1/index-debug-f1677836d3e11e238a7d6be4b97196b3.js",
	"app-user-group-mgmt": "wolf-app/user-group-mgmt/0.0.1/index-86dbb38c3c23a8198ce9aa0dc02c4cc0.js",
	"app-criteria-mgmt-debug": "wolf-app/criteria-mgmt/0.0.1/index-debug-287734fa69a7499f7640d459f4638baa.js",
	"app-criteria-mgmt": "wolf-app/criteria-mgmt/0.0.1/index-80c70d93dd3b6ab1fede5fa92182fab9.js",
	"app-privilege-mgmt-debug": "wolf-app/privilege-mgmt/0.0.1/index-debug-84c9ed5859d27e5dda4ab4c394be6f39.js",
	"app-privilege-mgmt": "wolf-app/privilege-mgmt/0.0.1/index-749cf78f9b79f0e54cf0e69b66307d69.js",
	"app-role-mgmt-debug": "wolf-app/role-mgmt/0.0.1/index-debug-cea8a1e7307b6a501aca77c16d6874eb.js",
	"app-role-mgmt": "wolf-app/role-mgmt/0.0.1/index-b310aec2cb352ce6874c7594c174da31.js",
	"app-vehicle-mgmt-debug": "wolf-app/vehicle-mgmt/0.0.1/index-debug-93fb673fcecb94c92947c0bcc7ea8bcc.js",
	"app-vehicle-mgmt": "wolf-app/vehicle-mgmt/0.0.1/index-90df9eb9ceedaa4d7b4536f345d1af24.js",
	"app-generic-filter-debug": "wolf-app/generic-filter/0.0.1/index-debug-f28e63776af29e460dc005e02d4dee5e.js",
	"app-generic-filter": "wolf-app/generic-filter/0.0.1/index-413d24e900f84ab2ff23179c1f1f160e.js",
	"app-main-debug": "wolf-app/app-main/0.0.1/index-debug-de73c8c342dd6b1f65a5f1787d9bd8d1.js",
	"app-main": "wolf-app/app-main/0.0.1/index-c391a044ea77939ed90d14ca4cbd1da3.js",
	"app-tpl": "wolf-app/wolf-tpl/wolf-tpl-82f80285ffadf6ddf67881cb8fe10379.js"
},
        map: [
	[
		"wolf-app/app-core/0.0.1/index-debug.js",
		"wolf-app/app-core/0.0.1/index-debug-80fd52afdbc1074d6b7367ed64a7dc0d.js"
	],
	[
		"wolf-app/app-core/0.0.1/index.js",
		"wolf-app/app-core/0.0.1/index-e48a407a09f051c446e1d7d59fdf4a3b.js"
	],
	[
		"wolf-app/app-common/0.0.1/index-debug.js",
		"wolf-app/app-common/0.0.1/index-debug-72a586e749b82836baf9bddb582a962b.js"
	],
	[
		"wolf-app/app-common/0.0.1/index.js",
		"wolf-app/app-common/0.0.1/index-bb4216d39af4a6c7be39f6325954c7b8.js"
	],
	[
		"wolf-app/security/0.0.1/index-debug.js",
		"wolf-app/security/0.0.1/index-debug-08379a1eafe1286cb1af5254b7a580b4.js"
	],
	[
		"wolf-app/security/0.0.1/index.js",
		"wolf-app/security/0.0.1/index-2ba65af79f67c4113eaf8bd8a2a9d73f.js"
	],
	[
		"wolf-app/layout/0.0.1/index-debug.js",
		"wolf-app/layout/0.0.1/index-debug-c5a4248bde653b7a0cf9091fc96b11c8.js"
	],
	[
		"wolf-app/layout/0.0.1/index.js",
		"wolf-app/layout/0.0.1/index-b4c42c4d82a81b84cf93b4ffb8cb1ec9.js"
	],
	[
		"wolf-app/dashboard/0.0.1/index-debug.js",
		"wolf-app/dashboard/0.0.1/index-debug-e80143216e57efff1262c02322a13f49.js"
	],
	[
		"wolf-app/dashboard/0.0.1/index.js",
		"wolf-app/dashboard/0.0.1/index-fe107eae853dccd53def49bc6a09d6cd.js"
	],
	[
		"wolf-app/user-mgmt/0.0.1/index-debug.js",
		"wolf-app/user-mgmt/0.0.1/index-debug-a5f3828ff592bc1aa41512606bbd02ac.js"
	],
	[
		"wolf-app/user-mgmt/0.0.1/index.js",
		"wolf-app/user-mgmt/0.0.1/index-ce0fbaf0b81bf6fcbb49891f3ae4c8f6.js"
	],
	[
		"wolf-app/user-group-mgmt/0.0.1/index-debug.js",
		"wolf-app/user-group-mgmt/0.0.1/index-debug-f1677836d3e11e238a7d6be4b97196b3.js"
	],
	[
		"wolf-app/user-group-mgmt/0.0.1/index.js",
		"wolf-app/user-group-mgmt/0.0.1/index-86dbb38c3c23a8198ce9aa0dc02c4cc0.js"
	],
	[
		"wolf-app/criteria-mgmt/0.0.1/index-debug.js",
		"wolf-app/criteria-mgmt/0.0.1/index-debug-287734fa69a7499f7640d459f4638baa.js"
	],
	[
		"wolf-app/criteria-mgmt/0.0.1/index.js",
		"wolf-app/criteria-mgmt/0.0.1/index-80c70d93dd3b6ab1fede5fa92182fab9.js"
	],
	[
		"wolf-app/privilege-mgmt/0.0.1/index-debug.js",
		"wolf-app/privilege-mgmt/0.0.1/index-debug-84c9ed5859d27e5dda4ab4c394be6f39.js"
	],
	[
		"wolf-app/privilege-mgmt/0.0.1/index.js",
		"wolf-app/privilege-mgmt/0.0.1/index-749cf78f9b79f0e54cf0e69b66307d69.js"
	],
	[
		"wolf-app/role-mgmt/0.0.1/index-debug.js",
		"wolf-app/role-mgmt/0.0.1/index-debug-cea8a1e7307b6a501aca77c16d6874eb.js"
	],
	[
		"wolf-app/role-mgmt/0.0.1/index.js",
		"wolf-app/role-mgmt/0.0.1/index-b310aec2cb352ce6874c7594c174da31.js"
	],
	[
		"wolf-app/vehicle-mgmt/0.0.1/index-debug.js",
		"wolf-app/vehicle-mgmt/0.0.1/index-debug-93fb673fcecb94c92947c0bcc7ea8bcc.js"
	],
	[
		"wolf-app/vehicle-mgmt/0.0.1/index.js",
		"wolf-app/vehicle-mgmt/0.0.1/index-90df9eb9ceedaa4d7b4536f345d1af24.js"
	],
	[
		"wolf-app/generic-filter/0.0.1/index-debug.js",
		"wolf-app/generic-filter/0.0.1/index-debug-f28e63776af29e460dc005e02d4dee5e.js"
	],
	[
		"wolf-app/generic-filter/0.0.1/index.js",
		"wolf-app/generic-filter/0.0.1/index-413d24e900f84ab2ff23179c1f1f160e.js"
	],
	[
		"wolf-app/app-main/0.0.1/index-debug.js",
		"wolf-app/app-main/0.0.1/index-debug-de73c8c342dd6b1f65a5f1787d9bd8d1.js"
	],
	[
		"wolf-app/app-main/0.0.1/index.js",
		"wolf-app/app-main/0.0.1/index-c391a044ea77939ed90d14ca4cbd1da3.js"
	],
	[
		"wolf-app/app-tpl/wolf-tpl.js",
		"wolf-app/wolf-tpl/wolf-tpl-82f80285ffadf6ddf67881cb8fe10379.js"
	]
],
        debug: false
    });
}
/*production end*/
