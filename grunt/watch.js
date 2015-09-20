'use strict';

module.exports = {
    options: {
        atBegin: true,
        livereload: true
    },
    src: {
        files: ['<%= config.source %>/**'],
        tasks: ['browserify']
    },
    js: {
        files: ['Gruntfile.js', '<%= config.source %>/**/*.js'],
        tasks: ['jshint', 'karma:unit']
    },
    css: {
        options: {
            livereload: false
        },
        files: ['www/sass/**/*.scss'],
        tasks: ['compass:dev']
    },
    html: {
        files: ['www/**/*.html'],
        tasks: ['processhtml:dev']
    },
    war: {
        files: ['<%= config.destination %>/'],
        tasks: ['copy:war']
    }
};
