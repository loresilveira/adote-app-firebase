import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  adotante: Adotante;
  adot : Observable<any>;

  constructor(private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase, private db : UsuariosProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
        this.adot = this.afDatabase.object(`adotante/${data.uid}`).valueChanges();
      
      }
    })
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth => 
      {this.afDatabase.object(`adotante/${auth.uid}`).set(this.adotante).then(() => this.navCtrl.push(HomePage))})
  }
}
