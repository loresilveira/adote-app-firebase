import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { ProfilePage } from '../profile/profile';

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

  async login(user: User){

    try{
      const result = await this.firebaseauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if(result){
        this.navCtrl.setRoot(ProfilePage);
      }
    }
    catch(e) {
      console.error(e);
    }
      
  }
 
}
