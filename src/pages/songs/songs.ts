import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { OpenSongBridge } from '../../providers/open-song-bridge';
import { ToastController } from 'ionic-angular';
import {Tabs} from 'ionic-angular';

@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html'
  //,providers: [OpenSongBridge]
})
export class SongsPage {
  songs;

  constructor(public navCtrl: NavController
              ,public loadingCtrl: LoadingController
              ,public toastCtrl: ToastController
              ,public tabs: Tabs
              ,public OSB: OpenSongBridge) {
    this.initializeItems();
  }

  //-------------------------------------------------------------------------
  gotoConnect() {
    this.tabs.select(0);
  }
  //-------------------------------------------------------------------------
  presentSong(song) {
    let loader = this.loadingCtrl.create({
      content: "Starting...",
      duration: 10000
    });
    loader.present();
    this.OSB.closeCurrentPresentation().then(() => {
      this.OSB.showSong(song.name).then(() => {
        loader.dismiss();
        // Todo => goto screen controller
      }).catch( (err) => {
        loader.dismiss();
        this.toastCtrl.create({message: err,duration: 3000}).present();
      });
    }).catch( (err) => {
      loader.dismiss();
      this.toastCtrl.create({message: err,duration: 3000}).present();
    });
  }

  //-------------------------------------------------------------------------
  initializeItems() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });
    loader.present();
    this.songs = [];
    this.OSB.loadSongs().then(() => {
      this.songs = this.OSB.getLoadedSongs();
      loader.dismiss();
    }).catch( (err) => {
      loader.dismiss();
      this.toastCtrl.create({message: err,duration: 3000}).present();
    });
  }
  //-------------------------------------------------------------------------
  getItems(ev) {
      // set val to the value of the ev target
      var val = ev.target.value;
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.songs = this.OSB.getLoadedSongs().filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }else{
        this.songs = this.OSB.getLoadedSongs();
      }
    }
  }
