import { Component } from '@angular/core';
import { RestStorage } from  '../../providers/rest/storage';
import { AlertController } from 'ionic-angular';
import { NavController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import { DesafiosFormPage } from '../desafios-form/desafios-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public restStorage: RestStorage,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private barcodeScanner: BarcodeScanner,
              public platform:Platform,
              public androidPermissions: AndroidPermissions) {
  }

 codQr()
  {
    if(this.restStorage.getStatus())
    {
       this.barcodeScanner.scan().then(text => {
       this.goToast("Desafio escaneado",'top');
       console.log(text);
       this.navCtrl.push(DesafiosFormPage,{text:text.text});
      }).catch(err => {
          console.log('Error', err);
      });
    }
    else
    {
            const confirm = this.alertCtrl.create({
              title: 'Debe iniciar sesión',
              buttons: [
                {
                  text: 'Iniciar sesión',
                  handler: () => {
                    this.navCtrl.push(LoginPage);
                  }
                },
                {
                  text: 'Registrarse',
                  handler: () => {
                    this.navCtrl.push(RegistroPage);
                  }
                }
              ]
            });
            confirm.present();
          
        }
    }

  goToast(mensaje: string,posicion:string)
  {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: posicion
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }



  }


