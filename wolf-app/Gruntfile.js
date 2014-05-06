module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            main: ['.build']
        },
        transport: {
            vehicleApp: {
                options: {
                    //idleading: 'dist',
                    paths: 'sea-modules',
                    debug: false,
                    alias: {
                        '$': 'jquery/jquery/1.10.1/jquery.js',
                        'underscore': 'underscore/1.4.4/underscore-debug.js',
                        'backbone': 'backbone/1.0.0/backbone-debug.js',
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
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'vehicle-mgmt',
                    src: '**/*.js',
                    dest: '.build/vehicle-app'
                }]
            }
        },
        concat: {
            vehicleApp: {
                options: {
                    include: 'all',
                    paths: 'sea-modules',
                },
                files: [{
                    expand: true,
                    cwd: '.build/vehicle-app',
                    src: ['vehicle-app.js'],
                    //src: '**/*.js',
                    //src: '**/*.js',
                    //filter: function(filepath) {
                    //    return !/-debug\.js$/.test(filepath);
                    //},
                    dest: '.build/vehicle-app'
                }]
            }
        },
        uglify: {
            vehicleApp: {
                files: [{
                    expand: true,
                    cwd: '.build/vehicle-app',
                    src: ['**/*.js', '!**/*-debug.js'],
                    dest: 'sea-modules/wolf-app/vehicle-app'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['clean', 'transport', 'concat', 'uglify', 'clean']);
};
