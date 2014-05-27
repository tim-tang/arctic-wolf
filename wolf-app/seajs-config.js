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
        "app-user-expose": "wolf-app-path/user-mgmt/src/index-expose.js",
        "app-user-group-mgmt": "wolf-app-path/user-group-mgmt/src/index.js",
        "app-user-group-expose": "wolf-app-path/user-group-mgmt/src/index-expose.js",
        "app-criteria-mgmt": "wolf-app-path/criteria-mgmt/src/index.js",
        "app-privilege-mgmt": "wolf-app-path/privilege-mgmt/src/index.js",
        "app-privilege-expose": "wolf-app-path/privilege-mgmt/src/index-expose.js",
        "app-role-mgmt": "wolf-app-path/role-mgmt/src/index.js",
        "app-role-expose": "wolf-app-path/role-mgmt/src/index-expose.js",
        "app-vehicle-mgmt": "wolf-app-path/vehicle-mgmt/src/index.js",
        "app-generic-filter": "wolf-app-path/generic-filter/src/index.js",
        "app-main": "wolf-app-path/app-main/src/index.js"
    }
});

        // --------------------------------------------------------- //
        //               ARCTIC WOLF MODULES & MAPPING               //
        // --------------------------------------------------------- //
/*production start*/
if(seajs.production){
    seajs.config({
        alias: {
	"app-core-debug": "wolf-app/app-core/0.0.1/index-debug-80fd52afdbc1074d6b7367ed64a7dc0d.js",
	"app-core": "wolf-app/app-core/0.0.1/index-e48a407a09f051c446e1d7d59fdf4a3b.js",
	"app-common-debug": "wolf-app/app-common/0.0.1/index-debug-17627a080cd789b0622201e5f8fd70c2.js",
	"app-common": "wolf-app/app-common/0.0.1/index-c974e75c57ea249de2de93c1c73ba194.js",
	"app-security-debug": "wolf-app/security/0.0.1/index-debug-08379a1eafe1286cb1af5254b7a580b4.js",
	"app-security": "wolf-app/security/0.0.1/index-2ba65af79f67c4113eaf8bd8a2a9d73f.js",
	"app-layout-debug": "wolf-app/layout/0.0.1/index-debug-c5a4248bde653b7a0cf9091fc96b11c8.js",
	"app-layout": "wolf-app/layout/0.0.1/index-b4c42c4d82a81b84cf93b4ffb8cb1ec9.js",
	"app-dashboard-debug": "wolf-app/dashboard/0.0.1/index-debug-e80143216e57efff1262c02322a13f49.js",
	"app-dashboard": "wolf-app/dashboard/0.0.1/index-fe107eae853dccd53def49bc6a09d6cd.js",
	"app-user-mgmt-debug": "wolf-app/user-mgmt/0.0.1/index-debug-0bc248acd6e04b27a4e0556aba232043.js",
	"app-user-mgmt": "wolf-app/user-mgmt/0.0.1/index-15b563a2c8da23ee0a0c1fb93bb26333.js",
	"app-user-group-mgmt-debug": "wolf-app/user-group-mgmt/0.0.1/index-debug-28f3470d894957140d1e409b7a373207.js",
	"app-user-group-mgmt": "wolf-app/user-group-mgmt/0.0.1/index-1734fb4b8846fe7215cb405eca19cb05.js",
	"app-criteria-mgmt-debug": "wolf-app/criteria-mgmt/0.0.1/index-debug-287734fa69a7499f7640d459f4638baa.js",
	"app-criteria-mgmt": "wolf-app/criteria-mgmt/0.0.1/index-80c70d93dd3b6ab1fede5fa92182fab9.js",
	"app-privilege-mgmt-debug": "wolf-app/privilege-mgmt/0.0.1/index-debug-84c9ed5859d27e5dda4ab4c394be6f39.js",
	"app-privilege-mgmt": "wolf-app/privilege-mgmt/0.0.1/index-749cf78f9b79f0e54cf0e69b66307d69.js",
	"app-role-mgmt-debug": "wolf-app/role-mgmt/0.0.1/index-debug-3eb146f4aaf5acdefb8132416a6a892d.js",
	"app-role-mgmt": "wolf-app/role-mgmt/0.0.1/index-e76fd84ee946b36984efa8a8c7c9e436.js",
	"app-vehicle-mgmt-debug": "wolf-app/vehicle-mgmt/0.0.1/index-debug-589395fc89e936b479f7a2cce35b0b03.js",
	"app-vehicle-mgmt": "wolf-app/vehicle-mgmt/0.0.1/index-106cc9dfddf4eef54781968814e23e58.js",
	"app-generic-filter-debug": "wolf-app/generic-filter/0.0.1/index-debug-dcf4baeb167e657b80f60be43c381042.js",
	"app-generic-filter": "wolf-app/generic-filter/0.0.1/index-41a594a644ff2a9ed58444dd9cfd391c.js",
	"app-main-debug": "wolf-app/app-main/0.0.1/index-debug-de73c8c342dd6b1f65a5f1787d9bd8d1.js",
	"app-main": "wolf-app/app-main/0.0.1/index-c391a044ea77939ed90d14ca4cbd1da3.js",
	"app-tpl": "wolf-app/wolf-tpl/wolf-tpl-0255cef61a2bd6c6697622d773a7323d.js"
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
		"wolf-app/app-common/0.0.1/index-debug-17627a080cd789b0622201e5f8fd70c2.js"
	],
	[
		"wolf-app/app-common/0.0.1/index.js",
		"wolf-app/app-common/0.0.1/index-c974e75c57ea249de2de93c1c73ba194.js"
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
		"wolf-app/user-mgmt/0.0.1/index-debug-0bc248acd6e04b27a4e0556aba232043.js"
	],
	[
		"wolf-app/user-mgmt/0.0.1/index.js",
		"wolf-app/user-mgmt/0.0.1/index-15b563a2c8da23ee0a0c1fb93bb26333.js"
	],
	[
		"wolf-app/user-group-mgmt/0.0.1/index-debug.js",
		"wolf-app/user-group-mgmt/0.0.1/index-debug-28f3470d894957140d1e409b7a373207.js"
	],
	[
		"wolf-app/user-group-mgmt/0.0.1/index.js",
		"wolf-app/user-group-mgmt/0.0.1/index-1734fb4b8846fe7215cb405eca19cb05.js"
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
		"wolf-app/role-mgmt/0.0.1/index-debug-3eb146f4aaf5acdefb8132416a6a892d.js"
	],
	[
		"wolf-app/role-mgmt/0.0.1/index.js",
		"wolf-app/role-mgmt/0.0.1/index-e76fd84ee946b36984efa8a8c7c9e436.js"
	],
	[
		"wolf-app/vehicle-mgmt/0.0.1/index-debug.js",
		"wolf-app/vehicle-mgmt/0.0.1/index-debug-589395fc89e936b479f7a2cce35b0b03.js"
	],
	[
		"wolf-app/vehicle-mgmt/0.0.1/index.js",
		"wolf-app/vehicle-mgmt/0.0.1/index-106cc9dfddf4eef54781968814e23e58.js"
	],
	[
		"wolf-app/generic-filter/0.0.1/index-debug.js",
		"wolf-app/generic-filter/0.0.1/index-debug-dcf4baeb167e657b80f60be43c381042.js"
	],
	[
		"wolf-app/generic-filter/0.0.1/index.js",
		"wolf-app/generic-filter/0.0.1/index-41a594a644ff2a9ed58444dd9cfd391c.js"
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
		"wolf-app/wolf-tpl/wolf-tpl-0255cef61a2bd6c6697622d773a7323d.js"
	]
],
        debug: false
    });
}
/*production end*/
