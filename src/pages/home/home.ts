import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { ListaAnimaisPage } from '../lista-animais/lista-animais';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';
import { ProfilePage } from '../profile/profile';
import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalModel } from '../../models/animal';
import { PreferenciasPage } from '../preferencias/preferencias';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  adotante : Adotante;
  animais: any[];
  recomendados :  AnimalModel[]
  public user: User = {
    email: '',
    password : ''
  }
  constructor(public navCtrl: NavController,
    private toast: ToastController,
    public afAuth: AngularFireAuth,
    private afDatabase : AngularFireDatabase,
    private recomendacao : RecomendacaoProvider,
    private provider: AnimaisProvider) {
    console.log('Hello Home Page')

  }

  ngOnInit(){
    this.provider.abreCarregando();
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
        this.user.email = data.email;
        this.toast.create({
          message: `Bem vindo ao RecSysAdoption, ${data.email}`,
          duration: 3000
        }).present();
        // this.adotante = this.afDatabase.list(`adontante/${data.uid}`)
        this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(res => {this.adotante = res})
        this.provider.getAll().subscribe(res => { 
          this.animais = res;
          console.log(this.animais)
          console.log(this.adotante)
          this.provider.fechaCarregando();
          if(this.adotante && this.animais){
            this.cosineSimilaraty(this.adotante, this.animais);
          }
          
        })
  
      }else{
        this.toast.create({
          message: 'Não foi possível se autenticar',
          duration: 3000
        }).present();
      }
    }
    )
 

  }

  cosineSimilaraty (adotante: any, animais: any){    
    let vetorAdotante = Object.keys(adotante).map(key => adotante[key])
    animais.forEach(item =>{
      let vetorAnimal = Object.keys(item).map(key => item[key]);
      vetorAnimal.shift();
      let measure = this.recomendacao.similaridadeCosseno(vetorAdotante, vetorAnimal)
      item.similaridade = measure;
     
    })
  
    let listaAnimais = this.ordenar(animais)
    this.recomendados = listaAnimais.filter((item) =>{ return item.similaridade !== 0})
    console.log(this.recomendados)

}

ordenar(lista: any) {
  let ordenados = lista.sort((a,b)=>{
    if(a.similaridade < b.similaridade) {return -1}
    if(a.similaridade > b.similaridade) {return 1}
    return 0;
  })
  return ordenados;
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
    this.navCtrl.push(PreferenciasPage, {'adotante':this.adotante});
    }

  goToListaAnimaisPage(){
   
    this.navCtrl.push(ListaAnimaisPage, {'animais':this.animais});
  }


}