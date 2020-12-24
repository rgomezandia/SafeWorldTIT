import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from  '../../providers/rest/rest';
import { RestStorage } from  '../../providers/rest/storage';
import { HomePage } from '../home/home'
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the DesafiosFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-desafios-form',
  templateUrl: 'desafios-form.html',
})
export class DesafiosFormPage {

  codigoDesafioQr:string;
  foto=false;
  clickedImagePath:any;
  puntos:number;
  latitud:number;
  longitud:number;
  numero_desafio:number;
  id_persona:number;
  resultado:any;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection:0
  }


  //CodDef01, CodDef02, CodDef03.

  constructor(private camera: Camera,
              public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider,
              public restStorage: RestStorage,
              private toastCtrl: ToastController) {

    this.codigoDesafioQr = this.navParams.get('text')

  }

  ionViewDidLoad() {
    console.log(this.codigoDesafioQr);

    this.id_persona = this.restStorage.getId()

    if(this.codigoDesafioQr == 'CodDef01')
    {
      this.puntos = 15;
      this.latitud = -36.7925027;
      this.longitud = -73.0678099;
      this.numero_desafio = 1;
    } else if (this.codigoDesafioQr == 'CodDef02')
    {
      this.puntos = 10;
      this.latitud = -36.8325228;
      this.longitud = -73.0465239;
      this.numero_desafio = 2;
    } else if (this.codigoDesafioQr == 'CodDef03')
    {
      this.puntos = 8;
      this.latitud = -36.8270267;
      this.longitud = -73.0501287;
      this.numero_desafio = 3;
    }
  }

  registroDesafioUser()
  {

    if(this.foto==true && this.clickedImagePath!="")
    {

       this.restProvider.post("InsertarDesafio",{codigo_qr: this.codigoDesafioQr, puntos: this.puntos, latitud: this.latitud, longitud: this.longitud, numero_desafio: this.numero_desafio, id_persona: this.id_persona, base64Foto: this.clickedImagePath})
      .subscribe(
        (data)=>{this.resultado = data; console.log(data);},
        (error)=>{this.resultado = error; console.log(error);}
      )

      let TIME_IN_MS = 10000;
      setTimeout( () => {
      console.log(this.resultado);
        if(this.resultado.status == "success")
        {
          this.goToast("Desafio Completado")
          this.navCtrl.push(HomePage)
            .then(() => {
              this.navCtrl.setRoot(HomePage);
              this.navCtrl.popToRoot();
          });
        }
          else
          {
            this.goToast("El desafio no pudo ser completado");
          }
        }, TIME_IN_MS);
    }
    else
    {
      this.goToast("Debe subir una fotografia");
    }
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


  clickImage()
  {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImagePath = 'data:image/jpeg;base64,' + imageData;
      this.foto=true;
     }, (err) => {
      // Handle error
     });
  }
  

}
