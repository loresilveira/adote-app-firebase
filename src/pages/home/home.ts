import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalPage } from '../animal/animal';
import { ListaAnimaisPage } from '../lista-animais/lista-animais';
import { UsuarioPage } from '../usuario/usuario';
import { ListaUsuariosPage } from '../lista-usuarios/lista-usuarios';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public user: User = {
    email: '',
    password : ''
  }
  constructor(public navCtrl: NavController,
    private provider: AnimaisProvider,
    private toast: ToastController,
    public firebaseauth: AngularFireAuth) {

    console.log('Hello Home Page')

  }

  register(){
    this.navCtrl.push('RegisterPage')
   }

  // public LoginComEmail(): void {
  //   this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
  //     .then(() => {
  //       this.exibirToast('Login efetuado com sucesso');
  //     })
  //     .catch((erro: any) => {
  //       this.exibirToast(erro);
  //     });
  // }
  cadastrarUsuario() {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        console.log('Usuário criado com sucesso');
      })
      .catch((erro: any) => {
        console.log(erro);
      });
  }
  // public Sair(): void {
  //   this.firebaseauth.auth.signOut()
  //     .then(() => {
  //       this.exibirToast('Você saiu');
  //     })
  //     .catch((erro: any) => {
  //       this.exibirToast(erro);
  //     });
  // }
  // private exibirToast(mensagem: string): void {
  //   let toast = this.toast.create({
  //     duration: 3000,
  //     position: 'botton'
  //   });
  //   toast.setMessage(mensagem);
  //   toast.present();
  // }


  // goToListaUsuarioPage(){
  //   this.navCtrl.push(ListaUsuariosPage);
  // }

  // goToListaAnimaisPage(){
  //   this.navCtrl.push(ListaAnimaisPage);
  // }

  // goToRecomendacaoPage(){

  // }

}