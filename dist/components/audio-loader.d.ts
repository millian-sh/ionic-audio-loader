import { ElementRef, Renderer, OnInit, EventEmitter } from '@angular/core';
import { AudioLoader } from '../providers/audio-loader';
import { AudioLoaderConfig } from '../providers/audio-loader-config';
export declare class AudLoader implements OnInit {
    private _element;
    private _renderer;
    private _audioLoader;
    private _config;
    /**
     * The URL of the audio to load.
     */
    src: string;
    private _src;
    /**
     * Fallback URL to load when the audio url fails to load or does not exist.
     */
    fallbackUrl: string;
    /**
     * Whether to show a spinner while the audio loads
     */
    spinner: boolean;
    /**
     * Whether to show the fallback audio instead of a spinner while the audio loads
     */
    fallbackAsPlaceholder: boolean;
    /**
     * Use <img> tag
     */
    useImg: boolean;
    private _useImg;
    /**
     * Convenience attribute to disable caching
     * @param val
     */
    noCache: boolean;
    /**
     * Enable/Disable caching
     * @type {boolean}
     */
    cache: boolean;
    /**
     * Width of the audio. This will be ignored if using useImg.
     */
    width: string;
    /**
     * Height of the audio. This will be ignored if using useImg.
     */
    height: string;
    /**
     * Display type of the audio. This will be ignored if using useImg.
     */
    display: string;
    /**
     * Background size. This will be ignored if using useImg.
     */
    backgroundSize: string;
    /**
     * Background repeat. This will be ignored if using useImg.
     */
    backgroundRepeat: string;
    /**
     * Name of the spinner
     */
    spinnerName: string;
    /**
     * Color of the spinner
     */
    spinnerColor: string;
    /**
     * Notify on audio load..
     */
    load: EventEmitter<AudLoader>;
    /**
     * Indicates if the audio is still loading
     * @type {boolean}
     */
    isLoading: boolean;
    element: HTMLElement;
    constructor(_element: ElementRef, _renderer: Renderer, _audioLoader: AudioLoader, _config: AudioLoaderConfig);
    ngOnInit(): void;
    private updateAudio(audioUrl);
    /**
     * Gets the audio URL to be loaded and disables caching if necessary
     * @returns {string}
     */
    private processAudioUrl(audioUrl);
    /**
     * Set the audio to be displayed
     * @param audioUrl {string} audio src
     * @param stopLoading {boolean} set to true to mark the audio as loaded
     */
    private setAudio(audioUrl, stopLoading?);
}
