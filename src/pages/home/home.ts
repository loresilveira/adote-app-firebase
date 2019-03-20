import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AnimaisProvider } from '../../providers/animais/animais';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animais: Observable<any>;

  constructor(public navCtrl: NavController, private provider: AnimaisProvider,
    private toast: ToastController) {

    this.animais = this.provider.getAll();
  }

  newAnimal() {
    this.navCtrl.push('AnimalEditPage');
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