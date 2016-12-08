import { Component } from '@angular/core';

import { ConnectPage } from '../connect/connect';
import { SlidesPage } from '../slides/slides';
import { SongsPage } from '../songs/songs';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ConnectPage;
  tab2Root: any = SlidesPage;
  tab3Root: any = SongsPage;
  tab4Root: any = AboutPage;

  constructor() {

  }
}
