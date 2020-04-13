(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('ImgixAPI', ['exports', './fetchResource'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(exports, require('./fetchResource'));
    } else {
        var mod = {
        exports: {}
        };
        global.ImgixAPI = factory(mod.exports, global.fetchResource);
    }
})(this, function (exports, _fetchResource) {
    'use strict';
    var fetch = _fetchResource;

    // default ImgixAPI settings passed in during instantiation
    var DEFAULTS = {
        version: 1
    };

    var ImgixAPI = (function() {
        function ImgixAPI(opts = {}) {
            this.settings = {};

            if (opts.version) {
                this.settings.version = opts.version;
            } else {
                this.settings = DEFAULTS;
            }
        };

        return ImgixAPI;
    })();

    ImgixAPI.prototype.request = function(path, options) {
        return fetch.fetchResource(path, options)
    };

    return ImgixAPI;

});