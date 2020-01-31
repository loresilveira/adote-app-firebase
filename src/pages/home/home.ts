import { Component } from '@angular/core';
import { NavController, MenuController, Icon } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';
import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalModel } from '../../models/animal';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { AvaliadosProvider } from '../../providers/avaliados/avaliados';
import { AvaliadoModel } from '../../models/avaliado';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage {

  adotante : Adotante;
  recomendados :  any[];
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
        this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(res => {this.adotante = res})
        this.provider.getAll().subscribe(res => { 
          const lista : any[] = res
          this.listaAnimais = lista;
          this.dialogo.fechaCarregando();

          if(this.adotante && this.listaAnimais){
            this.listaAnimais = this.filtrar(this.listaAnimais, this.adotante);
          
          }

          this.avaliacaoProvider.getAll().subscribe(item =>{
          this.avaliados = item;
            if(this.avaliados){
              console.log('entrou')
              const listaLimpa = this.removerAvaliados(this.listaAnimais, this.avaliados);
              this.recomendados = this.recomendacao.cosineSimilaraty(this.adotante, listaLimpa);
              console.log(this.recomendados)
              console.log(this.avaliados);
            }
          })
          
        })
  
      }else{
        this.dialogo.exibirToast("Não foi possível se autenticar");
      }
    }
    )
  }

  filtrar(lista: any, item: any){
    const filtrados = lista.filter(animal => animal.porte === item.porte || animal.porte === "medio");
    return filtrados;
  }
   

 removerAvaliados(animais: any[], avaliacoes: any[]){
   animais.map(animal =>{ animal.avaliacao = 0})
   for (let index = 0; index < avaliacoes.length; index++) {
     const avaliacao = avaliacoes[index];
     const animal = animais.find(item => item.key === avaliacao.key)
     if(animal){
       const indice = animais.indexOf(animal)
       animais.splice(indice,1)
     }
   }
  //  animais.map(animal =>{ animal.avaliacao = 0})
  //   for (let index = 0; index < animais.length; index++) {
  //     const animal = animais[index];
  //     if(avaliacoes.length > 0){
  //       for (let index = 0; index < avaliacoes.length; index++) {
  //         const avaliacao = avaliacoes[index];
  //         if(animal.key === avaliacao.key){
  //           // animal.avaliacao = avaliacao.rating
  //          animais.splice(index)
            
  //         }
  //       }
  //     }
  //   }
    return animais
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
      // this.popularAvaliacao(this.recomendados, this.avaliados)
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

  sair(){
    this.afAuth.auth.signOut().then(()=>{ this.navCtrl.setRoot(LoginPage)})
  }

}