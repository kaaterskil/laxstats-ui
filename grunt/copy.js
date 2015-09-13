module.exports = {
    libs: {
        files: [{
            expand: true,
            cwd: 'www/lib',
            src: '**',
            dest: '<%= config.destination %>/lib/'
        }]
    },
    images: {
        files: [{
            expand: true,
            cwd: 'www/',
            src: 'images/**',
            dest: '<%= config.destination %>/'
        }, {
            expand: true,
            cwd: 'www/',
            src: 'css/**',
            dest: '<%= config.destination %>/'
        }]
    },
    war: {
        files: [{
            expand: true,
            cwd: '<%= config.destination %>/',
            src: '**',
            dest: 'target/public'
        }]
    }
};
