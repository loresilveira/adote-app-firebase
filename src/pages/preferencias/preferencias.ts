import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';


@IonicPage()
@Component({
  selector: 'page-preferencias',
  templateUrl: 'preferencias.html',
})
export class PreferenciasPage {

  adotante : Adotante;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.adotante = navParams.get('adotante');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferenciasPage');
  }

}
