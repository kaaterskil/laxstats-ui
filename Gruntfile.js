/* jshint node: true */
'use strict';

module.exports = function(grunt) {
    require('load-grunt-config')(grunt, {
        data: {
            banner: '/**\n' + 
                ' * Laxstats UI\n' +
                ' * Version: <%= package.version %>\n' +
                ' * Compiled: <%= grunt.template.today("isoUtcDateTime") %>\n' + 
                ' */\n',
            config: {
                appName: 'laxstats-ui',
                appFileName: 'laxstats',
                source: 'www/js',
                lib: 'www/lib/ionic/js',
                destination: 'dist'
            },
            helpers: {
                rename: require('./grunt/helpers/rename.js')
            },
            localsettings: {
                docsPath: './doc',
                coveragePath: './reports'
            }
        }
    });
};