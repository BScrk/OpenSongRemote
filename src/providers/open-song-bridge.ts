import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from '@angular/http';
import * as xml2js from "xml2js";
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class OpenSongBridge {
  //-------------------------------------------------------------------------
  //private static CLOSE_URL : string = "presentation/close";
  private static SONGS_LIST_URL : string = "song";
  //private static SHOW_SONG_URL: string  = "song/present";
  private static GET_STATUS_URL : string = "presentation/status";
  //-------------------------------------------------------------------------

  private connected : boolean;
  private loaded_songs: any;

  public static CONNECTED : string = null;
  public static HOST : string =  null;
  public static PORT : string =  null;
  public static TOKEN : string = null;

  //-------------------------------------------------------------------------
  constructor(public http: Http) {
    console.log('OpenSongBridge Provider Ready');
    this.connected = false;
  }

  //-------------------------------------------------------------------------
  GET( action : string ){
    var _h = new Headers();
    /*if(OpenSongBridge.TOKEN != ""){
      _h.append( 'Authorization','Basic '+ btoa(OpenSongBridge.TOKEN));
    }*/
    let url = "http://" + OpenSongBridge.HOST
                        + ":" + OpenSongBridge.PORT
                        + "/" + action;
    return this.http.get(url,{headers: _h}).map(res => res.text());
  }
  //-------------------------------------------------------------------------
  POST( action : string ){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    myHeaders.set('Content-type', 'text/plain');
    if(OpenSongBridge.TOKEN){
      myHeaders.append( 'Authorization','Basic '+ btoa(OpenSongBridge.TOKEN));
      //    myHeaders.set('Authorization', 'Basic dGVzdA==');
    }
    opt = new RequestOptions({
      headers: myHeaders
    })
    let url = "http://" + OpenSongBridge.HOST
                        + ":" + OpenSongBridge.PORT
                        + "/" + action;

    return this.http.post(url,'',opt).map(res => res.text());
  }
  //-------------------------------------------------------------------------
  loadSongs(){
    if(this.loaded_songs){
      return Promise.resolve("ok");
    }
    return new Promise( (resolve, reject) => {
      this.GET(OpenSongBridge.SONGS_LIST_URL).subscribe(data => {
          xml2js.parseString(data, (err, result) => {
            if(err){ reject("Parse Error"); }else{
              this.loaded_songs = _.map(result.response.song, val => val.$);
              resolve("ok");
            }
          });
        }, error => {
          reject("Connection Error");
        });
    });
  }

  //-------------------------------------------------------------------------
  getLoadedSongs(){
    return this.loaded_songs;
  }

  //-------------------------------------------------------------------------
  connect(host:string, port:string, pass:string){
    if(this.connected){
      return Promise.resolve("ok");
    }
    OpenSongBridge.HOST = host;
    OpenSongBridge.PORT = port;
    OpenSongBridge.TOKEN = pass;

    return new Promise( (resolve, reject) => {
      this.GET(OpenSongBridge.GET_STATUS_URL).subscribe(data => {
          // IP and port are ok... try pass security
          window.localStorage.setItem('host',host);
          window.localStorage.setItem('port',port);
          this.POST("").subscribe( d => {}
                                 , e =>{
                                    if(e.status == 404){
                                      window.localStorage.setItem('pass',pass);
                                      this.connected = true;
                                      resolve("ok");
                                    }else{
                                      reject("Invalid or missing password for "+ host);
                                    }
                                   });
        }, error => {
          reject("Unable to reach the OpenSong server "+ host + ":" + port);
        });
    });
  }
  //-------------------------------------------------------------------------
  isConnected():boolean{
    return this.connected;
  }
  //-------------------------------------------------------------------------
  logout(){
    window.localStorage.removeItem('host');
    window.localStorage.removeItem('port');
    window.localStorage.removeItem('pass');
    this.connected = false;
  }

}
