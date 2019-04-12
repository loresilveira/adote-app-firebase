import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  adotante = {} as Adotante;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
  }


  
  register() {
    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object('adotante/${auth.uid}').set(this.adotante).then(() =>
        this.navCtrl.setRoot('HomePage') 
      );
    })


    // this.user.email = this.usuario.email;
    // this.user.password = this.usuario.password;

    // this.auth.signUp(this.user).then(()=> { console.log(this.user.email+ ' '+ this.user.password)})

  }
}
