/**
 * 
 */
module.exports = {
    options: {
        port: 9001,
        livereload: 35729,
        hostname: 'localhost',
        base: '<%= config.destination %>/'
    },
    livereload: {
        options: {
            open: false
        }
    },
    dist: {
        options: {
            open: true,
            livereload: false
        }
    }
};
