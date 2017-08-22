import { Component, Input, Output, ElementRef, Renderer, EventEmitter } from '@angular/core';
import { AudioLoader } from '../providers/audio-loader';
import { AudioLoaderConfig } from '../providers/audio-loader-config';
var AudLoader = (function () {
    function AudLoader(_element, _renderer, _audioLoader, _config) {
        this._element = _element;
        this._renderer = _renderer;
        this._audioLoader = _audioLoader;
        this._config = _config;
        /**
         * Fallback URL to load when the audio url fails to load or does not exist.
         */
        this.fallbackUrl = this._config.fallbackUrl;
        /**
         * Whether to show a spinner while the audio loads
         */
        this.spinner = this._config.spinnerEnabled;
        /**
         * Whether to show the fallback audio instead of a spinner while the audio loads
         */
        this.fallbackAsPlaceholder = this._config.fallbackAsPlaceholder;
        this._useImg = this._config.useImg;
        /**
         * Enable/Disable caching
         * @type {boolean}
         */
        this.cache = true;
        /**
         * Width of the audio. This will be ignored if using useImg.
         */
        this.width = this._config.width;
        /**
         * Height of the audio. This will be ignored if using useImg.
         */
        this.height = this._config.height;
        /**
         * Display type of the audio. This will be ignored if using useImg.
         */
        this.display = this._config.display;
        /**
         * Background size. This will be ignored if using useImg.
         */
        this.backgroundSize = this._config.backgroundSize;
        /**
         * Background repeat. This will be ignored if using useImg.
         */
        this.backgroundRepeat = this._config.backgroundRepeat;
        /**
         * Name of the spinner
         */
        this.spinnerName = this._config.spinnerName;
        /**
         * Color of the spinner
         */
        this.spinnerColor = this._config.spinnerColor;
        /**
         * Notify on audio load..
         */
        this.load = new EventEmitter();
        /**
         * Indicates if the audio is still loading
         * @type {boolean}
         */
        this.isLoading = true;
    }
    Object.defineProperty(AudLoader.prototype, "src", {
        get: function () {
            return this._src;
        },
        /**
         * The URL of the audio to load.
         */
        set: function (audioUrl) {
            this._src = this.processAudioUrl(audioUrl);
            this.updateAudio(this._src);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AudLoader.prototype, "useImg", {
        /**
         * Use <img> tag
         */
        set: function (val) {
            this._useImg = val !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudLoader.prototype, "noCache", {
        /**
         * Convenience attribute to disable caching
         * @param val
         */
        set: function (val) {
            this.cache = val !== false;
        },
        enumerable: true,
        configurable: true
    });
    AudLoader.prototype.ngOnInit = function () {
        console.log('initializing audio-loader');
        if (this.fallbackAsPlaceholder && this.fallbackUrl) {
            this.setAudio(this.fallbackUrl, false);
        }
        if (!this.src) {
            // audio url was not passed
            // this can happen when [src] is set to a variable that turned out to be undefined
            // one example could be a list of users with their profile pictures
            // in this case, it would be useful to use the fallback audio instead
            // if fallbackUrl was used as placeholder we do not need to set it again
            if (!this.fallbackAsPlaceholder && this.fallbackUrl) {
                // we're not going to cache the fallback audio since it should be locally saved
                this.setAudio(this.fallbackUrl);
            }
            else {
                this.isLoading = false;
            }
        }
    };
    AudLoader.prototype.updateAudio = function (audioUrl) {
        var _this = this;
        this._audioLoader.getAudioPath(audioUrl)
            .then(function (audioUrl) { return _this.setAudio(audioUrl); })
            .catch(function (error) { return _this.setAudio(_this.fallbackUrl || audioUrl); });
    };
    /**
     * Gets the audio URL to be loaded and disables caching if necessary
     * @returns {string}
     */
    AudLoader.prototype.processAudioUrl = function (audioUrl) {
        if (this.cache === false) {
            // need to disable caching
            if (audioUrl.indexOf('?') === -1) {
                audioUrl += '?';
            }
            if (['&', '?'].indexOf(audioUrl.charAt(audioUrl.length)) === -1) {
                audioUrl += '&';
            }
            // append timestamp at the end to make URL unique
            audioUrl += 'cache_buster=' + Date.now();
        }
        console.log('processing audio url: ' + audioUrl);
        return audioUrl;
    };
    /**
     * Set the audio to be displayed
     * @param audioUrl {string} audio src
     * @param stopLoading {boolean} set to true to mark the audio as loaded
     */
    AudLoader.prototype.setAudio = function (audioUrl, stopLoading) {
        if (stopLoading === void 0) { stopLoading = true; }
        this.isLoading = !stopLoading;
        console.log('creating audio attribute');
        if (!this.element) {
            // create img element if we dont have one
            this.element = this._renderer.createElement(this._element.nativeElement, 'audio');
        }
        // set it's src
        this._renderer.setElementAttribute(this.element, 'src', audioUrl);
        if (this.fallbackUrl && !this._audioLoader.nativeAvailable) {
            this._renderer.setElementAttribute(this.element, 'onerror', "this.src=\"" + this.fallbackUrl + "\"");
        }
        this.load.emit(this);
    };
    return AudLoader;
}());
export { AudLoader };
AudLoader.decorators = [
    { type: Component, args: [{
                selector: 'audio-loader',
                template: '<ion-spinner *ngIf="spinner && isLoading && !fallbackAsPlaceholder" [name]="spinnerName" [color]="spinnerColor"></ion-spinner>',
                styles: ['ion-spinner { float: none; margin-left: auto; margin-right: auto; display: block; }']
            },] },
];
/** @nocollapse */
AudLoader.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
    { type: AudioLoader, },
    { type: AudioLoaderConfig, },
]; };
AudLoader.propDecorators = {
    'src': [{ type: Input },],
    'fallbackUrl': [{ type: Input, args: ['fallback',] },],
    'spinner': [{ type: Input },],
    'fallbackAsPlaceholder': [{ type: Input },],
    'useImg': [{ type: Input },],
    'noCache': [{ type: Input },],
    'cache': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'display': [{ type: Input },],
    'backgroundSize': [{ type: Input },],
    'backgroundRepeat': [{ type: Input },],
    'spinnerName': [{ type: Input },],
    'spinnerColor': [{ type: Input },],
    'load': [{ type: Output },],
};
//# sourceMappingURL=audio-loader.js.map