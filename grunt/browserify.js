'use strict';

module.exports = {
    app: {
        options: {
            transform: [
                ['babelify', {"sourceMaps": "inline"}], 
                'browserify-ngannotate', 
                'browserify-shim', 
                'partialify'
            ],
            external: [
                'angular', 
                'angular-animate', 
                'angular-messages',
                'angular-sanitize', 
                'angular-ui-router'
            ],
            browserifyOptions: {
                debug: true,
                require: ['jquery', 'underscore', 'moment']
            }
        },
        src: ['<%= config.source %>/app.js'],
        dest: '<%= config.destination %>/js/<%= config.appFileName %>.js'
    }
};
