import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { DialogoProvider } from '../../providers/dialogo/dialogo';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  adotante = {} as Adotante;
  

  constructor(private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase, 
    public navCtrl: NavController, public navParams: NavParams, private dialogoProvider : DialogoProvider) {
  }

  ngOnInit(){
    this.dialogoProvider.exibirAlert('Preencha os campos de acordo com seus estilo de vida, para oferecermos o melhor amigo ideal para você!')
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth => 
      {this.afDatabase.object(`adotante/${auth.uid}`).set(this.adotante).then(() => this.navCtrl.setRoot(HomePage))})
  }


}
