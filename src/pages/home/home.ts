import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalPage } from '../animal/animal';
import { ListaAnimaisPage } from '../lista-animais/lista-animais';
import { UsuarioPage } from '../usuario/usuario';
import { ListaUsuariosPage } from '../lista-usuarios/lista-usuarios';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animais: Observable<any>;

  constructor(public navCtrl: NavController, private provider: AnimaisProvider,
    private toast: ToastController
    ,public menu: MenuController) {
      console.log('Hello Home Page')

    this.animais = this.provider.getAll();
  }

  openMenu() {
    this.menu.open();
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

  goToListaUsuarioPage(){
    this.navCtrl.push(ListaUsuariosPage);
  }

  goToListaAnimaisPage(){
    this.navCtrl.push(ListaAnimaisPage);
  }

  goToRecomendacaoPage(){

  }

}