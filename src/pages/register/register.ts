import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  adotante = {} as Adotante;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }


  
  register() {



    // this.user.email = this.usuario.email;
    // this.user.password = this.usuario.password;

    // this.auth.signUp(this.user).then(()=> { console.log(this.user.email+ ' '+ this.user.password)})

  }
}
