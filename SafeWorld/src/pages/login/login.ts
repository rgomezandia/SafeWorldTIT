import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { RestProvider } from  '../../providers/rest/rest';
import { RestStorage } from  '../../providers/rest/storage';
import { HomePage } from '../home/home'
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario:string;
  contrasena:string;
  persona:any;
  loading = this.loadingCtrl.create({
    content: 'Por favor espere...'
  });

  constructor(public events: Events,
              public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider,
              public restStorage: RestStorage,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login()
  {
    this.restProvider.post("ObtenerUsuario",{usuario: this.usuario, contrasena: this.contrasena})
    .subscribe(
      (data)=>{this.persona = data;},
      (error)=>{this.persona = error; console.log(error);}
    )

    this.loading.present();

    let TIME_IN_MS = 3000;
    setTimeout( () => {
      if(this.persona.status == "success" && this.persona.mensaje != "NoData")
      {
        this.loading.dismiss();
        this.goToast("Bienvenido " + this.persona.mensaje[0].nombre)
        this.restStorage.setUser(this.persona.mensaje[0].usuario);
        this.restStorage.setNombre(this.persona.mensaje[0].nombre);
        this.restStorage.setId(this.persona.mensaje[0].id);
        this.navCtrl.push(HomePage)
          .then(() => {
            this.events.publish('userlogged');
            this.navCtrl.setRoot(HomePage);
            this.navCtrl.popToRoot();
        });
      }
      else
      {
        this.goToast("El usuario No existe, los datos fueron mal ingresados o no tiene internet");
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
