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
import { UsuariosProvider } from '../providers/usuarios/usuarios';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AnimalPageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCh3j2HD3jVE9mfDYiI0_Z-oA7wsTakVrE",
      authDomain: "fir-adote-app.firebaseapp.com",
      databaseURL: "https://fir-adote-app.firebaseio.com",
      projectId: "fir-adote-app",
      storageBucket: "fir-adote-app.appspot.com",
      messagingSenderId: "895899701153"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AnimaisProvider,
    UsuariosProvider
  ]
})
export class AppModule { }
