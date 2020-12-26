import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from  '../../providers/rest/rest';
import { RestStorage } from  '../../providers/rest/storage';

/**
 * Generated class for the MyinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myinfo',
  templateUrl: 'myinfo.html',
})



export class MyinfoPage
{

  informacion:any;
  nombre:string;
  id:any;
  cantidad:number;
  puntos:any;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public restProvider: RestProvider,
  public restStorage: RestStorage)
  {}


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad MyinfoPage');

    this.id = this.restStorage.getId();
    this.nombre = this.restStorage.getNombre();

    this.restProvider.post("ObtenerDesafios",{id_persona: this.id})
    .subscribe(
      (data)=>{this.informacion = data; console.log(data);},
      (error)=>{this.informacion = error; console.log(error);})
    console.log(this.informacion);
    //this.cantidad = this.informacion.lenght;
    //this.puntos = this.informacion.reduce((sum, value) => (typeof value.puntos == "number" ? sum + value.puntos : sum), 0);
  }

}
