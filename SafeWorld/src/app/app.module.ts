import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { DesafiosFormPage } from '../pages/desafios-form/desafios-form';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyinfoPage } from '../pages/myinfo/myinfo';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { CanjeaPremioPage } from '../pages/canjea-premio/canjea-premio';
import { ComienzaAReciclarPage } from '../pages/comienza-a-reciclar/comienza-a-reciclar';
import { EncuentraContenedorPage } from '../pages/encuentra-contenedor/encuentra-contenedor';
import { InfoResiduosPage } from '../pages/info-residuos/info-residuos';
import { ListPage } from '../pages/list/list';
import { TipsParaPlantarPage } from '../pages/tips-para-plantar/tips-para-plantar';
import { VideosEducativosPage } from '../pages/videos-educativos/videos-educativos';

import { RestProvider } from '../providers/rest/rest';
import { RestStorage } from '../providers/rest/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    MyinfoPage,
    AjustesPage,
    CanjeaPremioPage,
    ComienzaAReciclarPage,
    EncuentraContenedorPage,
    ListPage,
    TipsParaPlantarPage,
    InfoResiduosPage,
    VideosEducativosPage,
    DesafiosFormPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    MyinfoPage,
    AjustesPage,
    CanjeaPremioPage,
    ComienzaAReciclarPage,
    EncuentraContenedorPage,
    InfoResiduosPage,
    TipsParaPlantarPage,
    ListPage,
    VideosEducativosPage,
    DesafiosFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Diagnostic,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Camera,
    BarcodeScanner,
    RestStorage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
