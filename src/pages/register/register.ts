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
    private afAuth: AngularFireAuth) {
  }

  async register(user: User) {
      try{
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
        console.log(result);
        this.navCtrl.push(ProfilePage);
      }catch(e){
        console.error(e);    
      }
    }
 
}
