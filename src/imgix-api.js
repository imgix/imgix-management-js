(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('ImgixAPI', ['exports', './fetchWrapper'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(exports, require('./fetchWrapper'));
    } else {
        var mod = {
            exports: {
                window
            }
        };
        global.ImgixAPI = factory(mod.exports, global.fetchWrapper);
    }
})(this, function (exports, fetchWrapper) {
    'use strict';
    let fetch;

    if (exports.window !== undefined) {
        fetch = window.fetch;
    } else {
        fetch = fetchWrapper;
    }

    // default ImgixAPI settings passed in during instantiation
    const DEFAULTS = {
        version: 1
    };

    const ImgixAPI = (() => {
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

    ImgixAPI.prototype.request = function(path, options = {}) {
        return fetch(path, {
            ...options,
            version: this.settings.version
        });
    };

    return ImgixAPI;

});