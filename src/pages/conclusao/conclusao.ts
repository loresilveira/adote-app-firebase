import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConclusaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conclusao',
  templateUrl: 'conclusao.html',
})
export class ConclusaoPage {

  randomico: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.randomico = this.navParams.get('recomendaRandomico')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConclusaoPage');
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage, { 'randomico': true })
  }

}
