import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the TipsParaPlantarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tips-para-plantar',
  templateUrl: 'tips-para-plantar.html',
})
export class TipsParaPlantarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipsParaPlantarPage');
  }

  irHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
