import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';


@IonicPage()
@Component({
  selector: 'page-preferencias',
  templateUrl: 'preferencias.html',
})
export class PreferenciasPage {

  adotante : Adotante;
  profile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private autenticacaoProvider: AutenticacaoProvider) {
    this.adotante = navParams.get('adotante');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferenciasPage');
    this.getPerfil();
    if(this.profile){
      console.log(this.profile)
    }
  }

  getPerfil(){
    this.profile = this.autenticacaoProvider.getProfile();
  }

}
