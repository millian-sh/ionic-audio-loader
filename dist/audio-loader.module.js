import { NgModule } from '@angular/core';
import { AudLoader } from './components/audio-loader';
import { AudioLoader } from './providers/audio-loader';
import { AudioLoaderConfig } from './providers/audio-loader-config';
import { IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
var IonicAudioLoader = (function () {
    function IonicAudioLoader() {
    }
    IonicAudioLoader.forRoot = function () {
        return {
            ngModule: IonicAudioLoader,
            providers: [
                AudioLoaderConfig,
                AudioLoader,
                File,
                FileTransfer
            ]
        };
    };
    return IonicAudioLoader;
}());
export { IonicAudioLoader };
IonicAudioLoader.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AudLoader
                ],
                imports: [
                    IonicModule
                ],
                exports: [
                    AudLoader
                ]
            },] },
];
/** @nocollapse */
IonicAudioLoader.ctorParameters = function () { return []; };
//# sourceMappingURL=audio-loader.module.js.map