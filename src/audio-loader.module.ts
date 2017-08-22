import { NgModule, ModuleWithProviders } from '@angular/core';
import { ImgLoader } from './components/audio-loader';
import { ImageLoader } from './providers/audio-loader';
import { ImageLoaderConfig } from './providers/audio-loader-config';
import { IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    AudioLoader
  ],
  imports: [
    IonicModule
  ],
  exports: [
    AudioLoader
  ]
})
export class IonicAudioLoader {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IonicAudioLoader,
      providers: [
        AudioLoaderConfig,
        AudioLoader,
        File,
        FileTransfer
      ]
    };
  }
}
