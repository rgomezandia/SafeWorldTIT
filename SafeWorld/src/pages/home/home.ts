import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { RestStorage } from  '../../providers/rest/storage';
import { AlertController } from 'ionic-angular';
import { NavController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';
import { ToastController } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DesafiosFormPage } from '../desafios-form/desafios-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public restStorage: RestStorage,
              private toastCtrl: ToastController,
              public navCtrl: NavController,
              private qrScanner: QRScanner,
              public alertCtrl: AlertController,
              public platform:Platform,
              public androidPermissions: AndroidPermissions) {

  }

 codQr()
  {
    if(this.restStorage.getStatus())
    {
       // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.goToast('Autorizado','bot');

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.goToast("Desafio escaneado",'top');
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning 
            this.navCtrl.push(DesafiosFormPage,{text:text}); //SE PUEDE MODIFICAR CON CODIGOQR
          });

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
          .then((data : QRScannerStatus)=> { 
            alert("Estado camara: " + data.showing); //AVISA QUE LA CAMARA ESTA EN ESPERA PARA LA FOTO, AUNQUE NO SE VEA
          },err => {
            console.log(err);
          });

          // wait for user to scan something, then the observable callback will be called
         } else if (status.denied)
         {
           // Los permisos de la cámara están denegados permanentemente
           // Para poder volver a usar la cámara, el usaurio tendrá que abrir los ajustes de persmisos
           // Y dar permisos desde allí con la función "openSettings"
           this.goToast("permisos de la camara denegados permanentemente",'bot');
         } else
         {
           this.goToast("permisos de la camara denegados temporalmente",'bot');
           // Los permisos han sido denegados, pero no permanentemente. Si los solicitas otra vez volverá a aparecer la solicitud.
         }
      })
      .catch((e: any) => console.log('Error is', e));
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


  goToast(mensaje: string,posicion:string) {
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


