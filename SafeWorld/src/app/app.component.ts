import { Component, ViewChild } from '@angular/core';
import { Platform, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestStorage } from '../providers/rest/storage';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';

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
        { title: 'Home', component: HomePage }
      ];
  pageout = [
        { title: 'Home', component: HomePage },
        { title: 'LoginPage', component: LoginPage },
        { title: 'RegistroPage', component: RegistroPage }
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
