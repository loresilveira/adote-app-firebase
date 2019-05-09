import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AnimaisProvider } from '../providers/animais/animais';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AnimalPageModule } from '../pages/animal/animal.module';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { UsuariosProvider } from '../providers/usuarios/usuarios';

import { ListaAnimaisPageModule } from '../pages/lista-animais/lista-animais.module';
import { UsuarioPageModule } from '../pages/usuario/usuario.module';
import { ListaUsuariosPageModule } from '../pages/lista-usuarios/lista-usuarios.module';
import { RecomendacaoProvider } from '../providers/recomendacao/recomendacao';
import { RegisterPageModule } from '../pages/register/register.module';


import { LoginPage } from '../pages/login/login';
import { ProfilePageModule } from '../pages/profile/profile.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AnimalPageModule,
    ListaAnimaisPageModule,
    ListaUsuariosPageModule,
    UsuarioPageModule,
    RegisterPageModule,
    ProfilePageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCh3j2HD3jVE9mfDYiI0_Z-oA7wsTakVrE",
      authDomain: "fir-adote-app.firebaseapp.com",
      databaseURL: "https://fir-adote-app.firebaseio.com",
      projectId: "fir-adote-app",
      storageBucket: "fir-adote-app.appspot.com",
      messagingSenderId: "895899701153"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AnimaisProvider,
    UsuariosProvider,
    RecomendacaoProvider,
   
  ]
})
export class AppModule { }
