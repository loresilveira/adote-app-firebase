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
          this.dialogo.fechaCarregando();
          if(this.adotante && this.listaAnimais){
            this.recomendados = this.recomendacao.cosineSimilaraty(this.adotante, this.listaAnimais);
          }
          this.avaliacaoProvider.getAll().subscribe(item =>{
          this.avaliados = item;
            console.log(this.avaliados)
            console.log(this.recomendados)
            if(this.listaAnimais && this.avaliados){
              console.log('entrou')
              this.popularAvaliacao(this.recomendados, this.avaliados);
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



  popularAvaliacao(animais: any[], avaliacoes: any[]){
    animais.map(item =>{ 
      item.avaliacao = 0
    })
    for (let index = 0; index < animais.length; index++) {
      const animal = animais[index];
      if(avaliacoes.length > 0){
        for (let index = 0; index < avaliacoes.length; index++) {
          const avaliacao = avaliacoes[index];
          if(animal.key === avaliacao.key){
            animal.avaliacao = avaliacao.rating
          }
        }
      }
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.avaliacao.key],
      rating: [this.avaliacao.rating,],
      animal_key: [this.avaliacao.animal_key,],  
    });
  }

  salvaAvaliacao(){
    this.createForm();
     this.avaliacaoProvider.save(this.form.value)
      .catch((e) => {
        console.error(e);
      })
  }

  logRatingChange(rating, key){
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