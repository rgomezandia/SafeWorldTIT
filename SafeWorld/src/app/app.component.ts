import { Component, ViewChild } from '@angular/core';
import { Platform, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestStorage } from '../providers/rest/storage';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { MyinfoPage } from '../pages/myinfo/myinfo';

import { AjustesPage } from '../pages/ajustes/ajustes';
import { CanjeaPremioPage } from '../pages/canjea-premio/canjea-premio';
import { ComienzaAReciclarPage } from '../pages/comienza-a-reciclar/comienza-a-reciclar';
import { EncuentraContenedorPage } from '../pages/encuentra-contenedor/encuentra-contenedor';
import { InfoResiduosPage } from '../pages/info-residuos/info-residuos';
import { ListPage } from '../pages/list/list';
import { TipsParaPlantarPage } from '../pages/tips-para-plantar/tips-para-plantar';
import { VideosEducativosPage } from '../pages/videos-educativos/videos-educativos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp
{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  nombre = '';
  logout = false;
  puntos: any;
  pagein = [
        { title: 'Home', component: HomePage },
        { title: 'Mi informacion', component: MyinfoPage },
        { title: 'Ajustes', component: AjustesPage },
        { title: 'Canjea', component: CanjeaPremioPage },
        { title: 'Comienza a reciclar', component: ComienzaAReciclarPage },
        { title: 'Encuentra contenedores', component: EncuentraContenedorPage },
        { title: 'Informacion residuos', component: InfoResiduosPage },
        { title: 'Lista', component: ListPage },
        { title: 'Tips para plantar', component: TipsParaPlantarPage },
        { title: 'Videos Educativos', component: VideosEducativosPage }
      ];
  pageout = [
        { title: 'Home', component: HomePage },
        { title: 'LoginPage', component: LoginPage },
        { title: 'RegistroPage', component: RegistroPage },
        { title: 'Ajustes', component: AjustesPage },
        { title: 'Canjea', component: CanjeaPremioPage },
        { title: 'Comienza a reciclar', component: ComienzaAReciclarPage },
        { title: 'Encuentra contenedores', component: EncuentraContenedorPage },
        { title: 'Informacion residuos', component: InfoResiduosPage },
        { title: 'Lista', component: ListPage },
        { title: 'Tips para plantar', component: TipsParaPlantarPage },
        { title: 'Videos Educativos', component: VideosEducativosPage }
      ];

  constructor(public events: Events, public platform: Platform, public restStorage: RestStorage, public statusBar: StatusBar, public splashScreen: SplashScreen, public appCtrl: App) {

    this.events.subscribe ('userlogged', (() => {console.log ('evento recibido');
      this.nombre = this.restStorage.getNombre();
      console.log ("estatus actual: " + this.restStorage.getStatus());
      if(this.restStorage.getStatus())
      {
        this.pages = [];
        this.pages = this.pagein;
        this.logout=true;
        this.nav.setRoot(HomePage);
      }
      else
      {
        this.pages = [];
        this.pages = this.pageout;
        this.logout=false;
      }
    }));

    if(!this.restStorage.getStatus())
    {
      this.pages = [];
      this.pages = this.pageout;
    }

     this.initializeApp();

  }

  openPage(page)
  {
    this.nav.setRoot(page.component);
  }

  logoutUser()
  {
    this.restStorage.deleteUser();
    this.appCtrl.getRootNav().setRoot(HomePage);
    this.events.publish('userlogged');
  }

  ionViewCanEnter()
  {
    return this.restStorage.getStatus()
  }


  initializeApp()
  {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
