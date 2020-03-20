import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { ProfilePage } from '../profile/profile';
import { DialogoProvider } from '../../providers/dialogo/dialogo';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  confirmarSenha : string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseauth: AngularFireAuth,
    private dialogoProvider: DialogoProvider) {
  }

  verificaSenha(){
    if(this.confirmarSenha === this.user.password){
      this.register();
    }else{
      this.dialogoProvider.exibirToast('As senhas não são iguais.')
    }
  }

  async register() {
     try{
       const result = await this.firebaseauth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
       console.log(result);
       this.navCtrl.push(ProfilePage);
     }catch(e){
       console.error(e);    
   }
  }
}
