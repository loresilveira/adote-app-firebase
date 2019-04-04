import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { ListaAnimaisPage } from '../lista-animais/lista-animais';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  usuario  = {
    email:'',
    password:''
  }
  user : User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  
  register() {

    this.user.email = this.usuario.email;
    this.user.password = this.usuario.password;

    this.auth.signUp(this.user).then(()=> { console.log(this.user.email+ ' '+ this.user.password)})

  }
}
