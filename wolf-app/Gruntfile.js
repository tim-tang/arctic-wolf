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

    /**
     * Generate seajs alias/mapping configuration files.
     */
    var postMD5 = function(fileChanges) {
            var aliasMap = {};
            var map = [];
            fileChanges.forEach(function(fileChange) {
                fileChange.oldMapPath = fileChange.oldPath;
                fileChange.newMapPath = fileChange.newPath;

                // --------------- Alias Config -------------------//
                var version;
                if (fileChange.oldPath.indexOf('index-debug.js') > 0) {
                    var module_name = fileChange.oldPath.replace('/dist/index-debug.js', '');
                    version = grunt.file.readJSON(module_name + '/package.json').version;
                    fileChange.oldPath = 'app-' + module_name.replace('app-', '') + '-debug';
                } else {
                    var module_name = fileChange.oldPath.replace('/dist/index.js', '');
                    if (fileChange.oldPath.indexOf('app-tpl') > 0) {
                        version = grunt.file.readJSON(module_name + '/package.json').version;
                    }
                    fileChange.oldPath = 'app-' + module_name.replace('app-', '').replace('/wolf-tpl.js', '');
                }
                fileChange.newPath = fileChange.newPath.replace('sea-modules/', '');

                // --------------- Mapping Config -------------------//
                fileChange.oldMapPath = 'wolf-app/' + fileChange.oldMapPath.replace('dist', version ? version : '');

                aliasMap[fileChange.oldPath] = fileChange.newPath;
                map.push([fileChange.oldMapPath, fileChange.newPath]);
            });
            var code = '';
            var seajs_config_path = "seajs-config.js";
            if (grunt.file.exists(seajs_config_path)) {
                code = grunt.file.read(seajs_config_path);
            }
            code = code.replace(/\/\*production start\*\/[\s\S]*\/\*production end\*\//, '').trim();
            code = code + '\n' + grunt.template.process(SEAJS_MAP_TPL, {
                data: {
                    aliasJSON: JSON.stringify(aliasMap, null, '\t'),
                    mapJSON: JSON.stringify(map, null, '\t')
                }
            });
            grunt.file.write(seajs_config_path, code);
            grunt.log.writeln('Seajs Config File "' + seajs_config_path + '" Modified Succeed!');
        };

    // grunt wolf app configuration.
    grunt.initConfig({
        pkg: pkg,
        jst: {
            compile: {
                options: {
                    prettify: true,
                    amd: true
                },
                files: {
                    "app-tpl/wolf-tpl.js": "<%= pkg.wolf_app_tpl %>"
                }
            }
        },

        // TODO:
        // Read module package.json version to structure the module directory.
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
