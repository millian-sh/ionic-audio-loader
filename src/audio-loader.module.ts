import { NgModule, ModuleWithProviders } from '@angular/core';
import { AudLoader } from './components/audio-loader';
import { AudioLoader } from './providers/audio-loader';
import { AudioLoaderConfig } from './providers/audio-loader-config';
import { IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    AudLoader
  ],
  imports: [
    IonicModule
  ],
  exports: [
    AudLoader
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
