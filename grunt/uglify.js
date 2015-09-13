/**
 * 
 */
module.exports = {
    options: {
        mangle: false,
        sourceMap: true
    },
    app: {
        options: {
            banner: '<%= banner %>'
        },
        src: ['<%= browserify.app.dest %>'],
        dest: '<%= helpers.rename(browserify.app.dest, {suffix: ".min"}) %>'
    }
};
