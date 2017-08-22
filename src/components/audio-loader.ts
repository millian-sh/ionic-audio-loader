import { Component, Input, Output, ElementRef, Renderer, OnInit, EventEmitter } from '@angular/core';
import { AudioLoader } from '../providers/audio-loader';
import { AudioLoaderConfig } from '../providers/audio-loader-config';

@Component({
  selector: 'audio-loader',
  template: '<ion-spinner *ngIf="spinner && isLoading && !fallbackAsPlaceholder" [name]="spinnerName" [color]="spinnerColor"></ion-spinner>',
  styles: ['ion-spinner { float: none; margin-left: auto; margin-right: auto; display: block; }']
})
export class AudLoader implements OnInit {

  /**
   * The URL of the audio to load.
   */
  @Input()
  set src(audioUrl: string) {
    this._src = this.processAudioUrl(audioUrl);
    this.updateAudio(this._src);
  };

  get src(): string {
    return this._src;
  }

  private _src: string;

  /**
   * Fallback URL to load when the audio url fails to load or does not exist.
   */
  @Input('fallback') fallbackUrl: string = this._config.fallbackUrl;

  /**
   * Whether to show a spinner while the audio loads
   */
  @Input() spinner: boolean = this._config.spinnerEnabled;

  /**
   * Whether to show the fallback audio instead of a spinner while the audio loads
   */
  @Input() fallbackAsPlaceholder: boolean = this._config.fallbackAsPlaceholder;

  /**
   * Use <img> tag
   */
  @Input()
  set useImg(val: boolean) {
    this._useImg = val !== false;
  }

  private _useImg: boolean = this._config.useImg;

  /**
   * Convenience attribute to disable caching
   * @param val
   */
  @Input()
  set noCache(val: boolean) {
    this.cache = val !== false;
  }

  /**
   * Enable/Disable caching
   * @type {boolean}
   */
  @Input() cache: boolean = true;

  /**
   * Width of the audio. This will be ignored if using useImg.
   */
  @Input() width: string = this._config.width;

  /**
   * Height of the audio. This will be ignored if using useImg.
   */
  @Input() height: string = this._config.height;

  /**
   * Display type of the audio. This will be ignored if using useImg.
   */
  @Input() display: string = this._config.display;

  /**
   * Background size. This will be ignored if using useImg.
   */
  @Input() backgroundSize: string = this._config.backgroundSize;

  /**
   * Background repeat. This will be ignored if using useImg.
   */
  @Input() backgroundRepeat: string = this._config.backgroundRepeat;

  /**
   * Name of the spinner
   */
  @Input() spinnerName: string = this._config.spinnerName;

  /**
   * Color of the spinner
   */
  @Input() spinnerColor: string = this._config.spinnerColor;

  /**
   * Notify on audio load..
   */
  @Output()
  load: EventEmitter<AudLoader> = new EventEmitter<AudLoader>();

  /**
   * Indicates if the audio is still loading
   * @type {boolean}
   */
  isLoading: boolean = true;

  element: HTMLElement;

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer,
    private _audioLoader: AudioLoader,
    private _config: AudioLoaderConfig
  ) {}

  ngOnInit(): void {

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
      } else {
        this.isLoading = false;
      }
    }
  }

  private updateAudio(audioUrl: string) {
    this._audioLoader.getAudioPath(audioUrl)
      .then((audioUrl: string) => this.setAudio(audioUrl))
      .catch((error: any) => this.setAudio(this.fallbackUrl || audioUrl));
  }

  /**
   * Gets the audio URL to be loaded and disables caching if necessary
   * @returns {string}
   */
  private processAudioUrl(audioUrl: string): string {
    if (this.cache === false) {
      // need to disable caching

      if (audioUrl.indexOf('?') === -1) { // add ? if doesn't exists
        audioUrl += '?';
      }

      if (['&', '?'].indexOf(audioUrl.charAt(audioUrl.length)) === -1) { // add & if necessary
        audioUrl += '&';
      }

      // append timestamp at the end to make URL unique
      audioUrl += 'cache_buster=' + Date.now();
    }

    return audioUrl;
  }

  /**
   * Set the audio to be displayed
   * @param audioUrl {string} audio src
   * @param stopLoading {boolean} set to true to mark the audio as loaded
   */
  private setAudio(audioUrl: string, stopLoading: boolean = true): void {
    this.isLoading = !stopLoading;

    console.log('creating audio attribute');

    if (this._useImg) {
      
      // Using <img> tag
      if (!this.element) {
        // create img element if we dont have one
        this.element = this._renderer.createElement(this._element.nativeElement, 'audio');
      }

      // set it's src
      this._renderer.setElementAttribute(this.element, 'src', audioUrl);


      if (this.fallbackUrl && !this._audioLoader.nativeAvailable) {
        this._renderer.setElementAttribute(this.element, 'onerror', `this.src="${ this.fallbackUrl }"`);
      }

    } else {

      // Not using <img> tag

      this.element = this._element.nativeElement;

      if (this.display) {
        this._renderer.setElementStyle(this.element, 'display', this.display);
      }

      if (this.height) {
        this._renderer.setElementStyle(this.element, 'height', this.height);
      }

      if (this.width) {
        this._renderer.setElementStyle(this.element, 'width', this.width);
      }

      if (this.backgroundSize) {
        this._renderer.setElementStyle(this.element, 'background-size', this.backgroundSize);
      }

      if (this.backgroundRepeat) {
        this._renderer.setElementStyle(this.element, 'background-repeat', this.backgroundRepeat);
      }

      this._renderer.setElementStyle(this.element, 'background-audio', 'url(\'' + ( audioUrl || this.fallbackUrl ) + '\')');
    }

    this.load.emit(this);

  }

}
