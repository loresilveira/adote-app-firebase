import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalPage } from '../animal/animal';
import { ListaAnimaisPage } from '../lista-animais/lista-animais';
import { UsuarioPage } from '../usuario/usuario';
import { ListaUsuariosPage } from '../lista-usuarios/lista-usuarios';

import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  adotante : Observable<Adotante>;

  public user: User = {
    email: '',
    password : ''
  }
  constructor(public navCtrl: NavController,
    private toast: ToastController,
    public afAuth: AngularFireAuth,
    private afDatabase : AngularFireDatabase) {

    console.log('Hello Home Page')

  }

  ionViewWillLoad(){

    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
        this.user.email = data.email;
        this.toast.create({
          message: `Bem vindo ao RecSysAdoption, ${data.email}`,
          duration: 3000
        }).present();
        // this.adotante = this.afDatabase.list(`adontante/${data.uid}`)

        this.adotante = this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges();

        if (this.adotante)

        console.log(this.adotante)
      }else{
        this.toast.create({
          message: 'Não foi possível se autenticar',
          duration: 3000
        }).present();
      }
    })
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

  goToPerfil(){
    this.navCtrl.push(ProfilePage);
  }

  goToListaAnimaisPage(){
    this.navCtrl.push(ListaAnimaisPage);
  }

  // goToRecomendacaoPage(){

  // }

}