import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ListaAnimaisPage } from '../lista-animais/lista-animais';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // user = {} as User;
  public user ={
    email: "lorena@user.com", password: "123456"
    
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController,public firebaseauth: AngularFireAuth) {
  }

  ionViewDidLoad(){
    // if(this.user) this.login();
  }

  async login(){

    try{
      const result = await this.firebaseauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if(result){
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch(e) {
      console.error(e);
    }
    
      
  }

  async register(user: User) {
   this.navCtrl.push(RegisterPage);
}



}
