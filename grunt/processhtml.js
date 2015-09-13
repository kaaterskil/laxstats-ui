/**
 * 
 */
var data = {
    version: "<%= package.version %>",
    timestamp: new Date().toISOString()
};
module.exports = {
    options: {
        process: true,
        data: data
    },
    dev: {
        files: {
            '<%= config.destination %>/index.html' : ['www/index.html']
        }
    },
    dist: {
        files: {
            '<%= config.destination %>/index.html' : ['www/index.html']
        }
    }
};
