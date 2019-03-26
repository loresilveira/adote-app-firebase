import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { UsuarioPage } from '../usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-lista-usuarios',
  templateUrl: 'lista-usuarios.html',
})
export class ListaUsuariosPage {

  usuarios:  Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private provider: UsuariosProvider,
    private toast: ToastController) {

      this.usuarios =  this.provider.getAll();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaUsuariosPage');
  }

  newUsuario() {
    this.navCtrl.push(UsuarioPage);
  }

  editUsuario(usuario: any) {
    // Maneira 1
    this.navCtrl.push('UsuariotPage', { usuario: usuario });

    // Maneira 2
    // this.navCtrl.push('UsuariotPage', { key: usuario.key });
  }

  removeUsuario(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Usuário removido com sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover usuário.', duration: 3000 }).present();
        });
    }
  }

}
