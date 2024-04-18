const path = require('path');
const loaderUtils = require('loader-utils');
/**
 * Replacement for the function `css-loader` uses to build classnames.
 * Without this, our `*.module.css` files yield very long classnames.
 *
 * @param {*} loaderContext
 * @param {*} localIdentName
 * @param {*} localName
 * @param {*} options
 * @returns {String} Transformed local identity name, aka classname
 */
module.exports = function getLocalIdent(loaderContext, localIdentName, localName, options) {
    if (!options.context) {
        // eslint-disable-next-line no-param-reassign
        options.context = loaderContext.rootContext;
    }

    const request = path
        .relative(options.context, loaderContext.resourcePath)
        .replace(/\\/g, '/');

    // eslint-disable-next-line no-param-reassign
    options.content = `${options.hashPrefix + request}+${localName}`;

    // eslint-disable-next-line no-param-reassign
    localIdentName = localIdentName.replace(/\[local\]/gi, localName);

    const hash = loaderUtils.interpolateName(
        loaderContext,
        localIdentName,
        options
    );

    return hash
        .replace('.module', '')
        .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
        .replace(/^((-?[0-9])|--)/, '_$1');
}
