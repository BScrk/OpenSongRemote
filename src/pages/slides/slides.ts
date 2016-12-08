import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { OpenSongBridge } from '../../providers/open-song-bridge';
import { ToastController } from 'ionic-angular';
import {Tabs} from 'ionic-angular';
/*
  Generated class for the Slides page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html'
  //,providers: [OpenSongBridge]
})
export class SlidesPage {

  constructor(public navCtrl: NavController
              ,public loadingCtrl: LoadingController
              ,public toastCtrl: ToastController
              ,public tabs: Tabs
              ,private OSB: OpenSongBridge) {
    this.initializeItems();
  }
  //-------------------------------------------------------------------------
  gotoConnect() {
    this.tabs.select(0);
  }
  //-------------------------------------------------------------------------
  presentSlide(slide) {
  }
  //-------------------------------------------------------------------------
  initializeItems() {
  }
  //-------------------------------------------------------------------------
  getItems(ev) {
  }

}
