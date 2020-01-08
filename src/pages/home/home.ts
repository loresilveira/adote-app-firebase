import { Component } from '@angular/core';
import { NavController, ToastController, MenuController, Icon } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';

import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalModel } from '../../models/animal';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { AvaliadosProvider } from '../../providers/avaliados/avaliados';
import { AvaliadoModel } from '../../models/avaliado';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage {

  adotante : Adotante;
  animais: any[];
  recomendados :  AnimalModel[];
  avaliacao: AvaliadoModel;
  user: User = {email: '', password:''};
  ratingValue = 0;
  form: FormGroup;

  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private afDatabase : AngularFireDatabase,
    private recomendacao : RecomendacaoProvider,
    private provider: AnimaisProvider,
    private avaliacaoProvider: AvaliadosProvider,
    private dialogo: DialogoProvider,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,) {
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
          // this.createForm()
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

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.avaliacao.key],
      rating: [this.avaliacao.rating, ],
      animal_key: [this.avaliacao.animal_key, ],
  
    });
  }
  salvaAvaliacao(){
      console.log(this.avaliacao)
      // this.avaliacaoProvider.save(this.avaliacao)
      //   .then(() => {
      //     this.navCtrl.pop();
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //   })
    
  }

  logRatingChange(rating, key){
    console.log("changed rating: ",rating);
    console.log(key)

    this.avaliacao.rating = rating;
    this.avaliacao.animal_key = key;
    
    this.salvaAvaliacao()
  }

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