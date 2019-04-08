import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListaAnimaisPage } from '../pages/lista-animais/lista-animais';
import { AnimalPage } from '../pages/animal/animal';
import { UsuarioPage } from '../pages/usuario/usuario';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav

  pages:Array <{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    statusBar.styleDefault();
    splashScreen.hide();
    });

    // this.initializeApp();

    // this.pages = [
      
    //   {title: 'Lista de Animais', component: ListaAnimaisPage.name},
    //   {title: 'Cadastrar Animal', component: AnimalPage},
    //   {title: 'Cadastrar Usuário', component: UsuarioPage}
    // ]
    
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    });
  }

  openPage(page){
    this.nav.push(page.component);
  }

  // platform.ready().then(() => {
  //   // Okay, so the platform is ready and our plugins are available.
  //   // Here you can do any higher level native things you might need.
  //   statusBar.styleDefault();
  //   splashScreen.hide();
  //   });
}

