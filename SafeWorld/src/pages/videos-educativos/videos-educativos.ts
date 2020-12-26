import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Generated class for the VideosEducativosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videos-educativos',
  templateUrl: 'videos-educativos.html',
})
export class VideosEducativosPage {
  vid="https://www.youtube.com/embed/J9qSv2bwr9o";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private dom: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosEducativosPage');
  }

  sanitize(vid){
    return this.dom.bypassSecurityTrustResourceUrl(vid);
  }

}
