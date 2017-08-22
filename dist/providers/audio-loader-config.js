import { Injectable } from '@angular/core';
var AudioLoaderConfig = (function () {
    function AudioLoaderConfig() {
        this.debugMode = false;
        this.spinnerEnabled = true;
        this.fallbackAsPlaceholder = false;
        this.backgroundSize = 'contain';
        this.backgroundRepeat = 'no-repeat';
        this.display = 'block';
        this.width = '100%';
        this.height = '100%';
        this.useImg = false;
        this.concurrency = 5;
        this.maxCacheSize = -1;
        this.maxCacheAge = -1;
        this.audioReturnType = 'uri';
        this._cacheDirectoryName = 'audio-loader-cache';
    }
    Object.defineProperty(AudioLoaderConfig.prototype, "cacheDirectoryName", {
        get: function () {
            return this._cacheDirectoryName;
        },
        set: function (name) {
            name.replace(/\W/g, '');
            this._cacheDirectoryName = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enables debug mode to receive console logs, errors, warnings
     */
    AudioLoaderConfig.prototype.enableDebugMode = function () {
        this.debugMode = true;
    };
    /**
     * Enable/Disable the spinner by default. Defaults to true.
     * @param enable {boolean} set to true to enable
     */
    AudioLoaderConfig.prototype.enableSpinner = function (enable) {
        this.spinnerEnabled = enable;
    };
    /**
     * Enable/Disable the fallback audio as placeholder instead of the spinner. Defaults to false.
     * @param enable {boolean} set to true to enable
     */
    AudioLoaderConfig.prototype.enableFallbackAsPlaceholder = function (enable) {
        this.fallbackAsPlaceholder = enable;
    };
    /**
     * Sets the cache directory name. Defaults to 'audio-loader-cache'
     * @param name {string} name of directory
     */
    AudioLoaderConfig.prototype.setCacheDirectoryName = function (name) {
        this.cacheDirectoryName = name;
    };
    /**
     * Set default height for audios that are not using <img> tag
     * @param height {string} height
     */
    AudioLoaderConfig.prototype.setHeight = function (height) {
        this.height = height;
    };
    /**
     * Set default width for audios that are not using <img> tag
     * @param width {string} Width
     */
    AudioLoaderConfig.prototype.setWidth = function (width) {
        this.width = width;
    };
    /**
     * Enable display mode for audios that are not using <img> tag
     * @param display {string} Display mode
     */
    AudioLoaderConfig.prototype.setDisplay = function (display) {
        this.display = display;
    };
    /**
     * Use <img> tag by default
     * @param use {boolean} set to true to use <img> tag by default
     */
    AudioLoaderConfig.prototype.useAudioTag = function (use) {
        this.useImg = use;
    };
    /**
     * Set default background size for audios that are not using <img> tag
     * @param backgroundSize {string} Background size
     */
    AudioLoaderConfig.prototype.setBackgroundSize = function (backgroundSize) {
        this.backgroundSize = backgroundSize;
    };
    /**
     * Set background repeat for audios that are not using <img> tag
     * @param backgroundRepeat {string} Background repeat
     */
    AudioLoaderConfig.prototype.setBackgroundRepeat = function (backgroundRepeat) {
        this.backgroundRepeat = backgroundRepeat;
    };
    /**
     * Set fallback URL to use when audio src is undefined or did not resolve.
     * This audio will not be cached. This should ideally be a locally saved audio.
     * @param fallbackUrl {string} The remote or local URL of the audio
     */
    AudioLoaderConfig.prototype.setFallbackUrl = function (fallbackUrl) {
        this.fallbackUrl = fallbackUrl;
    };
    /**
     * Set the maximum number of allowed connections at the same time.
     * @param concurrency
     */
    AudioLoaderConfig.prototype.setConcurrency = function (concurrency) {
        this.concurrency = concurrency;
    };
    /**
     * Sets the maximum allowed cache size
     * @param cacheSize {number} Cache size in bytes
     */
    AudioLoaderConfig.prototype.setMaximumCacheSize = function (cacheSize) {
        this.maxCacheSize = cacheSize;
    };
    /**
     * Sets the maximum allowed cache age
     * @param cacheAge {number} Maximum cache age in milliseconds
     */
    AudioLoaderConfig.prototype.setMaximumCacheAge = function (cacheAge) {
        this.maxCacheAge = cacheAge;
    };
    /**
     * Set the return type of cached audios
     * @param audioReturnType {string} The return type; either 'base64' or 'uri'
     */
    AudioLoaderConfig.prototype.setAudioReturnType = function (audioReturnType) {
        this.audioReturnType = audioReturnType;
    };
    /**
     * Set the default spinnern ame
     * @param name
     */
    AudioLoaderConfig.prototype.setSpinnerName = function (name) {
        this.spinnerName = name;
    };
    /**
     * Set the default spinner color
     * @param color
     */
    AudioLoaderConfig.prototype.setSpinnerColor = function (color) {
        this.spinnerColor = color;
    };
    return AudioLoaderConfig;
}());
export { AudioLoaderConfig };
AudioLoaderConfig.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AudioLoaderConfig.ctorParameters = function () { return []; };
//# sourceMappingURL=audio-loader-config.js.map