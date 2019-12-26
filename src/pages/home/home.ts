import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';

import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalModel } from '../../models/animal';
import { DialogoProvider } from '../../providers/dialogo/dialogo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  adotante : Adotante;
  animais: any[];
  recomendados :  AnimalModel[];
  user: User = {email: '', password:''};
  stars: number[] = [1,2,3,4,5];
  
  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private afDatabase : AngularFireDatabase,
    private recomendacao : RecomendacaoProvider,
    private provider: AnimaisProvider,
    private dialogo: DialogoProvider,
    public menuCtrl: MenuController) {
    console.log('Hello Home Page')

    
  }

  ngOnInit(){
    this.dialogo.abreCarregando();
    
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
        this.user.email = data.email;
        // this.adotante = this.afDatabase.list(`adontante/${data.uid}`)
        this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(res => {this.adotante = res})
        this.provider.getAll().subscribe(res => { 
          this.animais = res;
          this.dialogo.fechaCarregando();
          if(this.adotante && this.animais){
            this.recomendados = this.recomendacao.cosineSimilaraty(this.adotante, this.animais);
            console.log(this.recomendados)
          }
          
        })
  
      }else{
        this.dialogo.exibirToast("Não foi possível se autenticar");
      }
    }
    )
  }

  //  public Sair(): void {
  //   this.firebaseauth.auth.signOut()
  //     .then(() => {
  //       this.exibirToast('Você saiu');
  //     })
  //     .catch((erro: any) => {
  //       this.exibirToast(erro);
  //     });
  // }

  goToPerfil(){
    this.navCtrl.push('PreferenciasPage', {'adotante':this.adotante});
    }

  goToListaAnimaisPage(){
   
    this.navCtrl.push('ListaAnimaisPage', {'animais':this.animais});
  }

  openMenu() {
    this.menuCtrl.open();
  }

}