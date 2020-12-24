import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from  '../../providers/rest/rest';
import { LoginPage } from '../login/login'
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  nombre:string;
  usuario:string;
  contrasena:string;
  datos:any;
  estadoVerificacion:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registro()
  {

    this.restProvider.post("verificarUsuario",{usuario: this.usuario})
      .subscribe(
        (data)=>{this.estadoVerificacion = data;},
        (error)=>{this.estadoVerificacion = error; console.log(error);}
      )

 

    let TIME_IN_MS = 2000;
    setTimeout( () => {

      if(this.estadoVerificacion.status == "success" && this.estadoVerificacion.mensaje != "SiData")
      {
        this.restProvider.post("AgregarUsuario",{nombre: this.nombre, usuario: this.usuario, contrasena: this.contrasena})
        .subscribe(
        (data2)=>{this.datos = data2;},
        (error2)=>{this.datos = error2; console.log(error2);})

        let TIME_IN_MS2 = 2000;
        setTimeout( () => {
          if(this.datos.status == "success")
          {
            this.goToast("Registro exitoso");
            this.navCtrl.push(LoginPage);
          }
          else
          {
            this.goToast("No se pudo realizar el registro");
          }
        }, TIME_IN_MS2);
      }
      else
      {
        this.goToast("El usuario ya existe");
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
