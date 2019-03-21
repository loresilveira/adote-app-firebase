import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalPage } from '../animal/animal';

@IonicPage()
@Component({
  selector: 'page-lista-animais',
  templateUrl: 'lista-animais.html',
})
export class ListaAnimaisPage {

  animais: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: AnimaisProvider,
    private toast: ToastController) {

    this.animais = this.provider.getAll();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAnimaisPage');
  }

  newAnimal() {
    this.navCtrl.push(AnimalPage);
  }

  editAnimal(animal: any) {
    // Maneira 1
    this.navCtrl.push('AnimalEditPage', { animal: animal });

    // Maneira 2
    // this.navCtrl.push('AnimalEditPage', { key: animal.key });
  }

  removeAnimal(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Animal removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o animal.', duration: 3000 }).present();
        });
    }
  }

}
