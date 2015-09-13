/**
 * 
 */
module.exports = {
    options: {
        jshintrc: true
    },
    app: {
        options: {
            force: true
        },
        src: ['Gruntfile.js', '<%= config.source %>/**/*.js', '!<%= config.source %>/**/*.spec.js']
    }
};
