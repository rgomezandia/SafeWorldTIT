import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


/**
 * Generated class for the ComienzaAReciclarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comienza-a-reciclar',
  templateUrl: 'comienza-a-reciclar.html',
})
export class ComienzaAReciclarPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComienzaAReciclarPage');
  }

  irHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
