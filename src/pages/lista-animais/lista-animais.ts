import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, IonicPage, AlertController } from 'ionic-angular';
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
    private toast: ToastController,
    private alert: AlertController) {

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
    this.navCtrl.push('AnimalPage', { animal: animal });

    // Maneira 2
    // this.navCtrl.push('AnimalEditPage', { key: animal.key });
  }

  removeAnimal(key: string) {
    let alert = this.alert.create({
      title: 'Excluir animal',
      message: 'Deseja excluir?',
      buttons: [
        {
            text: 'Não',
            handler: () => {
                console.log('Cancelado');
            }
        },
        {
            text: 'Sim',
            handler: () => {
              if (key) {
                this.provider.remove(key)
                  .then(() => {
                    this.toast.create({ message: 'Animal removido com sucesso.', duration: 3000 }).present();
                  })
                  .catch(() => {
                    this.toast.create({ message: 'Erro ao remover animal.', duration: 3000 }).present();
                  });
              }
            }
        }
    ]
    });
    alert.present();

    
  }

}
