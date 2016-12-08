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
              ,private OSB: OpenSongBridge) {
    this.initializeItems();
  }

  //-------------------------------------------------------------------------
  gotoConnect() {
    this.tabs.select(0);
  }
  //-------------------------------------------------------------------------
  presentSong(song) {
/*      let URL =  "http://127.0.0.1:8082/presentation/close";
      let token = "test"

      let options = new RequestOptions();
      if(token){
        options.headers.append( 'Authorization','Basic '+ btoa(token));
      }

      this.http.post(URL,"",options).map(res => res.text()).subscribe(data => {
        console.log(data);
      }, error => {
        console.log("Oooops!");
      });*/
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
