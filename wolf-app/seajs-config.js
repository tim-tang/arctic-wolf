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
        "bt-touchspin": "bootstrap.touchspin/bootstrap-touchspin/bootstrap.touchspin.js",
        "i18n": "i18next/1.7.3/i18next.amd.withJQuery-1.7.3.js"
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
if (seajs.production) {
    seajs.config({
        alias: {
            "app-core-debug": "wolf-app/app-core/0.0.1/index-debug-961a2688fca7f660bbb338349413408d.js",
            "app-core": "wolf-app/app-core/0.0.1/index-94da021a0754f7374c95aefd30385f68.js",
            "app-common-debug": "wolf-app/app-common/0.0.1/index-debug-b58bcb809b447f9bbed5516b441e8427.js",
            "app-common": "wolf-app/app-common/0.0.1/index-36d04379ce2b95933f6af5ba9065f3a7.js",
            "app-security-debug": "wolf-app/security/0.0.1/index-debug-f3450588efe63dd88767698aada621a8.js",
            "app-security": "wolf-app/security/0.0.1/index-85baf3a00aab8ec95ce409a345f50571.js",
            "app-layout-debug": "wolf-app/layout/0.0.1/index-debug-c5a4248bde653b7a0cf9091fc96b11c8.js",
            "app-layout": "wolf-app/layout/0.0.1/index-b4c42c4d82a81b84cf93b4ffb8cb1ec9.js",
            "app-dashboard-debug": "wolf-app/dashboard/0.0.1/index-debug-e80143216e57efff1262c02322a13f49.js",
            "app-dashboard": "wolf-app/dashboard/0.0.1/index-fe107eae853dccd53def49bc6a09d6cd.js",
            "app-user-mgmt-debug": "wolf-app/user-mgmt/0.0.1/index-debug-ce71d017165a22cae52d905f4999b172.js",
            "app-user-mgmt-expose-debug": "wolf-app/user-mgmt/0.0.1/index-expose-debug-b1b0523d19948b00bdd50466b08b4379.js",
            "app-user-mgmt-expose": "wolf-app/user-mgmt/0.0.1/index-expose-1d106cf240c1d54845e33adcfcb7d724.js",
            "app-user-mgmt": "wolf-app/user-mgmt/0.0.1/index-91c1a69bdacebfa4858ced0e218f2254.js",
            "app-user-group-mgmt-debug": "wolf-app/user-group-mgmt/0.0.1/index-debug-f80cd89710949c8b6f43ac085fb6546a.js",
            "app-user-group-mgmt-expose-debug": "wolf-app/user-group-mgmt/0.0.1/index-expose-debug-ae2194cc29cf515a3a4d0d21878bd2dd.js",
            "app-user-group-mgmt-expose": "wolf-app/user-group-mgmt/0.0.1/index-expose-4c07ddb6711e7819aa64a4774548b045.js",
            "app-user-group-mgmt": "wolf-app/user-group-mgmt/0.0.1/index-7c934ca84db9f8dc4a1562a26dcb154c.js",
            "app-criteria-mgmt-debug": "wolf-app/criteria-mgmt/0.0.1/index-debug-7495f095581596a3241c2f6667e31c11.js",
            "app-criteria-mgmt": "wolf-app/criteria-mgmt/0.0.1/index-67c64f3d17016987083a783386c1b609.js",
            "app-privilege-mgmt-debug": "wolf-app/privilege-mgmt/0.0.1/index-debug-86ca74297c9f9112ed84e6ec5f16229d.js",
            "app-privilege-mgmt-expose-debug": "wolf-app/privilege-mgmt/0.0.1/index-expose-debug-c031500e328c069d25d8a79c8292d658.js",
            "app-privilege-mgmt-expose": "wolf-app/privilege-mgmt/0.0.1/index-expose-e5ab691a2275c49f8539bcc13c2f48fb.js",
            "app-privilege-mgmt": "wolf-app/privilege-mgmt/0.0.1/index-ba4df39b1f749e2220e486cd03d28e8a.js",
            "app-role-mgmt-debug": "wolf-app/role-mgmt/0.0.1/index-debug-2fb3eaf1e888a6595b714f94a2dc2464.js",
            "app-role-mgmt-expose-debug": "wolf-app/role-mgmt/0.0.1/index-expose-debug-0820d81307f771ccb1ac18351d1afe32.js",
            "app-role-mgmt-expose": "wolf-app/role-mgmt/0.0.1/index-expose-25f492d9b038c9841966b2b038b7b3c4.js",
            "app-role-mgmt": "wolf-app/role-mgmt/0.0.1/index-58b8e3f704eb934a2fd259b8d7db1250.js",
            "app-vehicle-mgmt-debug": "wolf-app/vehicle-mgmt/0.0.1/index-debug-b0c511c4c5e23fb1906154913c5c5a58.js",
            "app-vehicle-mgmt": "wolf-app/vehicle-mgmt/0.0.1/index-4c989dd308a2f42caf4dfa46bc67cf31.js",
            "app-generic-filter-debug": "wolf-app/generic-filter/0.0.1/index-debug-dcf4baeb167e657b80f60be43c381042.js",
            "app-generic-filter": "wolf-app/generic-filter/0.0.1/index-41a594a644ff2a9ed58444dd9cfd391c.js",
            "app-main-debug": "wolf-app/app-main/0.0.1/index-debug-7fbd7af251f95647877e56f7a1ab83bd.js",
            "app-main": "wolf-app/app-main/0.0.1/index-f06e4fbacf1bf46026f737e40c17dbbd.js",
            "app-tpl": "wolf-app/wolf-tpl/wolf-tpl-558c8965a2f499dd429499d0e7d1437e.js"
        },
        map: [
            ["wolf-app/app-core/0.0.1/index-debug.js", "wolf-app/app-core/0.0.1/index-debug-961a2688fca7f660bbb338349413408d.js"],
            ["wolf-app/app-core/0.0.1/index.js", "wolf-app/app-core/0.0.1/index-94da021a0754f7374c95aefd30385f68.js"],
            ["wolf-app/app-common/0.0.1/index-debug.js", "wolf-app/app-common/0.0.1/index-debug-b58bcb809b447f9bbed5516b441e8427.js"],
            ["wolf-app/app-common/0.0.1/index.js", "wolf-app/app-common/0.0.1/index-36d04379ce2b95933f6af5ba9065f3a7.js"],
            ["wolf-app/security/0.0.1/index-debug.js", "wolf-app/security/0.0.1/index-debug-f3450588efe63dd88767698aada621a8.js"],
            ["wolf-app/security/0.0.1/index.js", "wolf-app/security/0.0.1/index-85baf3a00aab8ec95ce409a345f50571.js"],
            ["wolf-app/layout/0.0.1/index-debug.js", "wolf-app/layout/0.0.1/index-debug-c5a4248bde653b7a0cf9091fc96b11c8.js"],
            ["wolf-app/layout/0.0.1/index.js", "wolf-app/layout/0.0.1/index-b4c42c4d82a81b84cf93b4ffb8cb1ec9.js"],
            ["wolf-app/dashboard/0.0.1/index-debug.js", "wolf-app/dashboard/0.0.1/index-debug-e80143216e57efff1262c02322a13f49.js"],
            ["wolf-app/dashboard/0.0.1/index.js", "wolf-app/dashboard/0.0.1/index-fe107eae853dccd53def49bc6a09d6cd.js"],
            ["wolf-app/user-mgmt/0.0.1/index-debug.js", "wolf-app/user-mgmt/0.0.1/index-debug-ce71d017165a22cae52d905f4999b172.js"],
            ["wolf-app/user-mgmt/0.0.1/index-expose-debug.js", "wolf-app/user-mgmt/0.0.1/index-expose-debug-b1b0523d19948b00bdd50466b08b4379.js"],
            ["wolf-app/user-mgmt/0.0.1/index-expose.js", "wolf-app/user-mgmt/0.0.1/index-expose-1d106cf240c1d54845e33adcfcb7d724.js"],
            ["wolf-app/user-mgmt/0.0.1/index.js", "wolf-app/user-mgmt/0.0.1/index-91c1a69bdacebfa4858ced0e218f2254.js"],
            ["wolf-app/user-group-mgmt/0.0.1/index-debug.js", "wolf-app/user-group-mgmt/0.0.1/index-debug-f80cd89710949c8b6f43ac085fb6546a.js"],
            ["wolf-app/user-group-mgmt/0.0.1/index-expose-debug.js", "wolf-app/user-group-mgmt/0.0.1/index-expose-debug-ae2194cc29cf515a3a4d0d21878bd2dd.js"],
            ["wolf-app/user-group-mgmt/0.0.1/index-expose.js", "wolf-app/user-group-mgmt/0.0.1/index-expose-4c07ddb6711e7819aa64a4774548b045.js"],
            ["wolf-app/user-group-mgmt/0.0.1/index.js", "wolf-app/user-group-mgmt/0.0.1/index-7c934ca84db9f8dc4a1562a26dcb154c.js"],
            ["wolf-app/criteria-mgmt/0.0.1/index-debug.js", "wolf-app/criteria-mgmt/0.0.1/index-debug-7495f095581596a3241c2f6667e31c11.js"],
            ["wolf-app/criteria-mgmt/0.0.1/index.js", "wolf-app/criteria-mgmt/0.0.1/index-67c64f3d17016987083a783386c1b609.js"],
            ["wolf-app/privilege-mgmt/0.0.1/index-debug.js", "wolf-app/privilege-mgmt/0.0.1/index-debug-86ca74297c9f9112ed84e6ec5f16229d.js"],
            ["wolf-app/privilege-mgmt/0.0.1/index-expose-debug.js", "wolf-app/privilege-mgmt/0.0.1/index-expose-debug-c031500e328c069d25d8a79c8292d658.js"],
            ["wolf-app/privilege-mgmt/0.0.1/index-expose.js", "wolf-app/privilege-mgmt/0.0.1/index-expose-e5ab691a2275c49f8539bcc13c2f48fb.js"],
            ["wolf-app/privilege-mgmt/0.0.1/index.js", "wolf-app/privilege-mgmt/0.0.1/index-ba4df39b1f749e2220e486cd03d28e8a.js"],
            ["wolf-app/role-mgmt/0.0.1/index-debug.js", "wolf-app/role-mgmt/0.0.1/index-debug-2fb3eaf1e888a6595b714f94a2dc2464.js"],
            ["wolf-app/role-mgmt/0.0.1/index-expose-debug.js", "wolf-app/role-mgmt/0.0.1/index-expose-debug-0820d81307f771ccb1ac18351d1afe32.js"],
            ["wolf-app/role-mgmt/0.0.1/index-expose.js", "wolf-app/role-mgmt/0.0.1/index-expose-25f492d9b038c9841966b2b038b7b3c4.js"],
            ["wolf-app/role-mgmt/0.0.1/index.js", "wolf-app/role-mgmt/0.0.1/index-58b8e3f704eb934a2fd259b8d7db1250.js"],
            ["wolf-app/vehicle-mgmt/0.0.1/index-debug.js", "wolf-app/vehicle-mgmt/0.0.1/index-debug-b0c511c4c5e23fb1906154913c5c5a58.js"],
            ["wolf-app/vehicle-mgmt/0.0.1/index.js", "wolf-app/vehicle-mgmt/0.0.1/index-4c989dd308a2f42caf4dfa46bc67cf31.js"],
            ["wolf-app/generic-filter/0.0.1/index-debug.js", "wolf-app/generic-filter/0.0.1/index-debug-dcf4baeb167e657b80f60be43c381042.js"],
            ["wolf-app/generic-filter/0.0.1/index.js", "wolf-app/generic-filter/0.0.1/index-41a594a644ff2a9ed58444dd9cfd391c.js"],
            ["wolf-app/app-main/0.0.1/index-debug.js", "wolf-app/app-main/0.0.1/index-debug-7fbd7af251f95647877e56f7a1ab83bd.js"],
            ["wolf-app/app-main/0.0.1/index.js", "wolf-app/app-main/0.0.1/index-f06e4fbacf1bf46026f737e40c17dbbd.js"],
            ["wolf-app/app-tpl/wolf-tpl.js", "wolf-app/wolf-tpl/wolf-tpl-558c8965a2f499dd429499d0e7d1437e.js"]
        ],
        debug: false
    });
}
/*production end*/
