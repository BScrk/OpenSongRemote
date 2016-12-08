import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { OpenSongBridge } from '../../providers/open-song-bridge';


@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
  //,providers: [OpenSongBridge]
})
export class ConnectPage {
  connected : boolean;
  host : string;
  port : string;
  pass : string;

  constructor(public navCtrl: NavController
              ,public loadingCtrl: LoadingController
              ,public toastCtrl: ToastController
              ,private OSB: OpenSongBridge) {
    this.connected = false;

    var _ht = window.localStorage.getItem('host');
    var _pt = window.localStorage.getItem('port');
    var _ps = window.localStorage.getItem('pass');
    if(!_ht){
      this.host = this.port = this.pass = "";
    }else{
      this.host = _ht
      this.port = _pt
      this.pass = _ps
      this.connect();
    }
  }

  ionViewDidLoad() {
  }

  canConnect(){
    return ((this.host.length > 2) && (this.port.length > 2)) ;
  }

  disconnect(){
    this.host = this.port = this.pass = "";
    this.OSB.logout();
    this.connected = false;
  }

  connect(){
    let loader = this.loadingCtrl.create({
      content: "Connecting...",
      duration: 10000
    });
    loader.present();
    this.OSB.connect(this.host,this.port,this.pass).then( () => {
      loader.dismiss();
      this.connected = true;
    } ).catch((err)=>{
      this.connected = false;
      loader.dismiss();
      this.toastCtrl.create({message: err,duration: 3000}).present();
    });
  }

}
