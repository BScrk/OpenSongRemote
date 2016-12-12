import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { OpenSongBridge } from '../../providers/open-song-bridge';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-remote',
  templateUrl: 'remote.html'
})

export class RemotePage {

  constructor( public viewCtrl: ViewController
             , public toastCtrl: ToastController
             , public OSB: OpenSongBridge) {}

  ionViewDidLoad() {
    console.log('Hello RemotePage Page');
  }

  //-------------------------------------------------------------------------
  next(){
    console.log("Next");
    this.OSB.nextSlide().then( (msg) =>{
    }).catch((err)=>{
      this.toastCtrl.create({message: err,duration: 3000}).present();
    });
  }
  //-------------------------------------------------------------------------
  prev(){
    console.log("Prev");
    this.OSB.prevSlide().then( (msg) =>{
    }).catch((err)=>{
      this.toastCtrl.create({message: err,duration: 3000}).present();
    });
  }
  //-------------------------------------------------------------------------
  toggleScreen(){
    console.log("Toggle");
    this.OSB.setScreenMode("black").then( (msg) =>{
    }).catch((err)=>{
      this.toastCtrl.create({message: err,duration: 3000}).present();
    });
  }
  //-------------------------------------------------------------------------
  stop(){
    console.log("Stop");
    this.OSB.closeCurrentPresentation().then( (msg) =>{
    }).catch((err)=>{
      this.toastCtrl.create({message: err,duration: 3000}).present();
    });
  }
  //-------------------------------------------------------------------------
  close() {
    this.viewCtrl.dismiss();
  }


}
