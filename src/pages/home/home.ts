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
    public afAuth: AngularFireAuth) {

    console.log('Hello Home Page')

  }

  ionViewWillLoad(){

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.user.email = data.email;
        this.toast.create({
          message: 'Bem vindo ao RecSysAdoption, ${data.email}',
          duration: 3000
        }).present();
      }else{
        this.toast.create({
          message: 'Não foi possível se autenticar',
          duration: 3000
        }).present();
      }
    })
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        this.exibirToast('Login efetuado com sucesso');
        this.navCtrl.push(ListaAnimaisPage);
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  cadastrar() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        console.log('Usuário criado com sucesso');
      })
      .catch((erro: any) => {
        console.log(erro);
      });
  }

  exibirToast(mensagem: string){
    let toast = this.toast.create({
      duration: 3000,
      position: 'botton'
    });
    toast.setMessage(mensagem);
    toast.present();
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

  // goToListaUsuarioPage(){
  //   this.navCtrl.push(ListaUsuariosPage);
  // }

  // goToListaAnimaisPage(){
  //   this.navCtrl.push(ListaAnimaisPage);
  // }

  // goToRecomendacaoPage(){

  // }

}