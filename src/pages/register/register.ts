import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseauth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(user: User) {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          console.log('Usuário criado com sucesso');
        })
        .catch((erro: any) => {
          console.log(erro);
        });
  }
}
