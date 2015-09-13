/**
 * 
 */
module.exports = function(grunt) {
    'use strict';

    return {
        options: {
            port: 9888,
            basePath: '',
            frameworks: ['browserify', 'jasmine'],
            preprocessors: {
                '<%= config.source %>/**/*.js': ['browserify']
            },
            browserify: {
                debug: true,
                "require": ['jquery', 'underscore'],
                transform: [["browserify-istanbul", {
                    instrumenter: require('isparta'),
                    ignore: ['**/*.html', '**/*.spec.js']
                }], "partialify", "browserify-shim"]
            },
            colors: true,
            browsers: ['PhantomJS']
        },
        continuous: {
            autowatch: true,
            background: true,
            singleRun: false,
            files: {
                src: ['<%= config.lib %>/angular/angular.js',
                      'node_modules/angular-mocks/angular-mocks.js',
                      '<%= config.source %>/**/*.spec.js']
            }
        },
        unit: {
            singleRun: true,
            files: '<%= karma.continuous.files %>'
        }
    };
};
