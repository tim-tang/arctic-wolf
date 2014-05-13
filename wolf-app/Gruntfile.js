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
    var path = require('path');
    var fs = require('fs');
    var SEAJS_MAP_TPL = grunt.file.read(path.join(__dirname, 'seajs-map.tpl'));

    var postMD5 = function(fileChanges) {
            var map = [];
            fileChanges.forEach(function(fileChange) {
                fileChange.oldPath = 'wolf-app-path/' + fileChange.oldPath.replace('dist', 'src');
                fileChange.newPath = fileChange.newPath.replace('sea-modules/', '');
                map.push([fileChange.oldPath, fileChange.newPath]);
            });
            var code = '';
            var seajs_config_path = "seajs-config.js";
            if (grunt.file.exists(seajs_config_path)) {
                code = grunt.file.read(seajs_config_path);
            }
            code = code.replace(/\/\*map start\*\/[\s\S]*\/\*map end\*\//, '').trim();
            code = code + '\n' + grunt.template.process(SEAJS_MAP_TPL, {
                data: {
                    mapJSON: JSON.stringify(map, null, '\t')
                }
            });
            grunt.file.write(seajs_config_path, code);
            grunt.log.writeln('Seajs Config File "' + seajs_config_path + '" Modified Succeed!');
        };

    // project configuration.
    grunt.initConfig({
        pkg: pkg,
        // configuration to be run (and then tested).
        jst: {
            compile: {
                options: {
                    prettify: true,
                    amd: true
                },
                files: {
                    "wolf-app/wolf-tpl/wolf-tpl.js": "<%= pkg.wolf_app_tpl %>"
                }
            }
        },

        md5: {
            compile: {
                files: "<%=pkg.wolf_md5_modules %>",
                options: {
                    encoding: null,
                    keepBasename: true,
                    keepExtension: true,
                    after: postMD5
                }
            }
        },

        shell: {
            buildModules: {
                command: function() {
                    var pkg = grunt.file.readJSON('package.json');
                    var modules = pkg.wolf_build_modules;
                    var commands = [];
                    modules.forEach(function(module) {
                        commands.push('make -C ' + module + ' build');
                    });
                    return commands.join('&&');
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-md5');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('compile', ['jst']);
    grunt.registerTask('build', ['shell', 'md5']);
};
