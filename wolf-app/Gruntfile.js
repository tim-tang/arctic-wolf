/*
 * grunt-wolf-app
 * http://timtang.me/
 *
 * Copyright (c) 2014 Tim Tang, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    // project configuration.
    grunt.initConfig({
        pkg: pkg,
        // configuration to be run (and then tested).
        jst: {
            compile: {
                options: {
                    //templateSettings: {
                    //    interpolate: /\{\{(.+?)\}\}/g
                    //},
                    //processContent: function(src) {
                    //    return ['define(function(require, exports, module) {',
                    //            "var _ = require('underscore');",
                    //            src,
                    //            "module.exports = this['JST'];",
                    //            "});"
                    //            ].join('\n');
                    //},
                    prettify: true,
                    amd: true
                },
                files: {
                    "sea-modules/wolf-app/wolf-tpl/<%= pkg.version%>/wolf-tpl.js": "<%= pkg.wolf_app_tpl %>"
                }
            }
        },

        md5: {
            compile: {
                files: "<%=pkg.wolf_app_modules %>",
                options: {
                    encoding: null,
                    keepBasename: true,
                    keepExtension: true,
                    afterEach: function (fileChange, options) {}
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-md5');

    grunt.registerTask('compile', ['jst']);
    grunt.registerTask('deploy', ['md5']);
};
