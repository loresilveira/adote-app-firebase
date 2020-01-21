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
  
  recomendados :  AnimalModel[];
  user: User = {id: '', email: '', password:''};
  ratingValue = 0;
  form: FormGroup;
  public avaliacao : AvaliadoModel = {
    key: '',
    rating: 0,
    animal_key: '',
  }
  avaliados : any[];
  listaAnimais : AnimalModel[];

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
          const lista : any[] = res
          this.listaAnimais = lista;
          console.log(this.listaAnimais)
          this.dialogo.fechaCarregando();
          if(this.adotante && this.listaAnimais){
            this.recomendados = this.recomendacao.cosineSimilaraty(this.adotante, this.listaAnimais);
            console.log(this.recomendados)
          }
          this.avaliacaoProvider.getAll().subscribe(item =>{
          this.avaliados = item;
            console.log(this.avaliados)
            if(this.listaAnimais && this.avaliados){
              this.popularAvaliacao(this.listaAnimais, this.avaliados);
            }
          })
          
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



  popularAvaliacao(array: any, avaliacoes: any){
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      for (let index = 0; index < avaliacoes.length; index++) {
        const avaliacao = avaliacoes[index];
        if(element.key === avaliacao.animal_key){
          element.avaliacao = avaliacao.rating
        }else{
          element.avaliacao = 0
        }
      }
    }
    console.log(array)
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.avaliacao.key],
      rating: [this.avaliacao.rating,],
      animal_key: [this.avaliacao.animal_key,],  
    });
  }

  salvaAvaliacao(){
      // this.afAuth.authState.take(1).subscribe(auth => 
      //   {this.afDatabase.object(`avaliados/${auth.uid}/aliacoes/`).set(this.avaliacao)})
      this.createForm();
      this.avaliacaoProvider.save(this.form.value)
    
      .catch((e) => {
        console.error(e);
      })
  }

  logRatingChange(rating, key){
    console.log("changed rating: ",rating);
    console.log(key)
    this.avaliacao.key = key;
    this.avaliacao.rating = rating;
    this.avaliacao.animal_key = key;
    this.salvaAvaliacao();
    this.avaliacaoProvider.getAll().subscribe(item =>{
      this.avaliados = item;
      this.popularAvaliacao(this.recomendados, this.avaliados)

    });  
  }

  goToPerfil(){
    this.navCtrl.push('PreferenciasPage', {'adotante':this.adotante});
    }

  goToListaAnimaisPage(){
   
    this.navCtrl.push('ListaAnimaisPage', {'animais':this.listaAnimais});
  }

  openMenu() {
    this.menuCtrl.open();
  }

}