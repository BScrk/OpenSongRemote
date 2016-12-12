import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ConnectPage } from '../pages/connect/connect';
import { SlidesPage } from '../pages/slides/slides';
import { SongsPage } from '../pages/songs/songs';
import { TabsPage } from '../pages/tabs/tabs';
import { OpenSongBridge } from '../providers/open-song-bridge';
import { RemotePage } from '../pages/remote/remote';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ConnectPage,
    SongsPage,
    SlidesPage,
    TabsPage,
    RemotePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ConnectPage,
    SongsPage,
    SlidesPage,
    TabsPage,
    RemotePage
  ],
  providers: [OpenSongBridge,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
