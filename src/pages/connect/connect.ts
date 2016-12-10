import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { OpenSongBridge } from '../../providers/open-song-bridge';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
  //,providers: [OpenSongBridge]
})
export class ConnectPage {
  host : string;
  port : string;
  pass : string;

  constructor(public navCtrl: NavController
              ,public loadingCtrl: LoadingController
              ,public toastCtrl: ToastController
              ,public OSB: OpenSongBridge
              ,public alertCtrl: AlertController) {

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
  //-------------------------------------------------------------------------
  ionViewDidLoad() {
  }

  //-------------------------------------------------------------------------
  canConnect(){
    return ((this.host.length > 2) && (this.port.length > 2)) ;
  }

  //-------------------------------------------------------------------------
  disconnect(){
    let confirm = this.alertCtrl.create({
          title: 'Disconnect ?',
          message: 'Do you really whant to disconnect the Remote contoller to your Open Song server ?',
          buttons: [
            {
              text: 'Abort',
              handler: () => {
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                this.host = this.port = this.pass = "";
                this.OSB.logout();
              }
            }
          ]
        });
        confirm.present();
  }

  //-------------------------------------------------------------------------
  connect(){
    let loader = this.loadingCtrl.create({
      content: "Connecting...",
      duration: 10000
    });
    loader.present();
    this.OSB.connect(this.host,this.port,this.pass).then( () => {
      loader.dismiss();
    } ).catch((err)=>{
      loader.dismiss();
      this.toastCtrl.create({message: err,duration: 3000}).present();
    });
  }

  //-------------------------------------------------------------------------
  next(){
    console.log("Next");
    this.OSB.nextSlide().then( (msg) =>{
      if(msg == "Finished"){
        this.toastCtrl.create({message: "There are on other slides to show ;)",duration: 3000}).present();
      }
    });
  }
  //-------------------------------------------------------------------------
  prev(){
    console.log("Prev");
    this.OSB.prevSlide().then( (msg) =>{
      if(msg == "First"){
        this.toastCtrl.create({message: "You already are at the first slide ;)",duration: 3000}).present();
      }
    });
  }
  //-------------------------------------------------------------------------
  blackscreen(){
    console.log("Black");
    this.OSB.setScreenMode("black");
  }
  //-------------------------------------------------------------------------
  normalscreen(){
    console.log("Normal");
    this.OSB.setScreenMode("normal");
  }
  //-------------------------------------------------------------------------
  stop(){
    console.log("Stop");
    this.OSB.closeCurrentPresentation();
  }
}
