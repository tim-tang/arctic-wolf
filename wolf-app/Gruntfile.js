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
     * Initialize module configurations.
     * - read module configuration from package.json
     * - build the correct format
     */
    (function(grunt) {
        var appModules = [];
        var appTpls = [];
        pkg.wolf_build_modules.forEach(function(module) {
            var path = module + '/package.json';
            var map = {};
            var target;
            if (grunt.file.isFile(path)) {
                var module_pkg = grunt.file.readJSON(path);
                target = 'sea-modules/wolf-app/' + module + '/' + module_pkg.version + '/';
            }
            var source = module + '/dist/**/*.js';
            map[target] = source;
            appModules.push(map);
            appTpls.push(module + '/**/*.html');
        });
        appModules.push({
            "sea-modules/wolf-app/wolf-tpl/": "app-tpl/**/*.js"
        });
        grunt.config.set('app_modules', appModules);
        grunt.config.set('app_tpls', appTpls);
    })(grunt);

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
                    //console.log('DEBUG >> '+ fileChange.oldPath);
                }
                if (fileChange.oldPath.indexOf('index-expose-debug.js') > 0) {
                    var module_name = fileChange.oldPath.replace('/dist/index-expose-debug.js', '');
                    version = grunt.file.readJSON(module_name + '/package.json').version;
                    fileChange.oldPath = 'app-' + module_name.replace('app-', '') + '-expose-debug';
                }
                if (fileChange.oldPath.indexOf('index-expose.js') > 0) {
                    var module_name = fileChange.oldPath.replace('/dist/index-expose.js', '');
                    if (grunt.file.isFile(module_name + '/package.json')) {
                        version = grunt.file.readJSON(module_name + '/package.json').version;
                    }
                    fileChange.oldPath = 'app-' + module_name.replace('app-', '') + '-expose';
                } else {
                    var module_name = fileChange.oldPath.replace('/dist/index.js', '').replace('/dist/index-expose.js', '');
                    if (grunt.file.isFile(module_name + '/package.json')) {
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
                    "app-tpl/wolf-tpl.js": grunt.config.get('app_tpls')
                }
            }
        },

        md5: {
            compile: {
                files: grunt.config.get('app_modules'),
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
                        if (module !== 'app-tpl') commands.push('make -C ' + module + ' build');
                    });
                    return commands.join('&&');
                }
            }

            //copyResource: {
            //    command: function() {
            //        var pkg = grunt.file.readJSON('package.json');
            //        var modules = pkg.wolf_build_modules;
            //        var commands = [];
            //        modules.forEach(function(module) {
            //            if (module !== 'app-tpl') commands.push('make -C ' + module + ' build');
            //        });
            //        return commands.join('&&');
            //    }
            //}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-md5');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('compile', ['jst']);
    grunt.registerTask('build', ['shell', 'md5']);
};
