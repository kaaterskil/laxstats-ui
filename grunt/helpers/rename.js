/**
 * Method to rename files.
 * 
 * @param {string} path Path to rename
 * @param {object} options Options to rename with:
 * @param {string} options.basename Filename without extension
 * @param {string} options.dirname Relative path from base directory
 * @param {string} options.extname File extension (including the '.')
 * @param {string} options.prefix String to prepend to the basename
 * @param {string} options.suffix String to append to the basename
 * @returns {string} Renamed path
 */
module.exports = function(path, options) {
    var Path = require('path'), 
        dirname = 'dirname' in options ? options.dirname : Path.dirname(path), 
        prefix = options.prefix || '', 
        suffix = options.suffix || '', 
        extname = 'extname' in options ? options.extname : Path.extname(path), 
        basename = 'basename' in options ? options.basename : Path.basename(path, extname);

    return Path.join(dirname, prefix + basename + suffix + extname);
};
