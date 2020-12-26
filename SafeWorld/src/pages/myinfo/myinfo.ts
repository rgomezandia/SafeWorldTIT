import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from  '../../providers/rest/rest';
import { RestStorage } from  '../../providers/rest/storage';
import { ToastController } from 'ionic-angular';

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
  status:any;
  puntos=0;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public restProvider: RestProvider,
  public restStorage: RestStorage,
  private toastCtrl: ToastController)
  {}


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad MyinfoPage');

    this.id = this.restStorage.getId();
    this.nombre = this.restStorage.getNombre();

    this.restProvider.post("ObtenerDesafios",{id_persona: this.id})
    .subscribe(
      (data:datos)=>{this.informacion = data.mensaje; this.status = data.status; console.log(data);},
      (error)=>{this.informacion = error; console.log(error);})

    let TIME_IN_MS = 2000;
    setTimeout( () => {
      if(this.status == "success")
      {
        for (let valorp of this.informacion){
           this.puntos = this.puntos + valorp.puntos;
        }
      }
      else
      {
        this.goToast("No se pudo calcular el puntaje total");
      }
    }, TIME_IN_MS);
  }


  goToast(mensaje: string) {
  let toast = this.toastCtrl.create({
    message: mensaje,
    duration: 3000,
    position: 'bot'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  }

}

class datos {
  mensaje: string[];
  status: string;
}
