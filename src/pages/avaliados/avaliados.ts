import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimaisProvider } from '../../providers/animais/animais';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { AnimalModel } from '../../models/animal';
import { AvaliadosProvider } from '../../providers/avaliados/avaliados';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';

@IonicPage()
@Component({
  selector: 'page-avaliados',
  templateUrl: 'avaliados.html',
})
export class AvaliadosPage {

  animais: AnimalModel[];
  user: User = {id: '', email: '', password:''};
  adotante : Adotante;
  listaAnimais : AnimalModel[];
  avaliados : any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public afAuth: AngularFireAuth,
              private afDatabase : AngularFireDatabase,
              private recomendacao : RecomendacaoProvider,
              private provider: AnimaisProvider,
              private avaliacaoProvider: AvaliadosProvider,
              private dialogo: DialogoProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliadosPage');
  }

  ngOnInit(){
    this.avaliacaoProvider.getAllAdmin().subscribe(item =>{
      item.map(i =>{ 
        console.log(i.key)

      })
    })
  }

  // ngOnInit(){
  //   this.carregarListaAnimais();
  //   this.afAuth.authState.take(1).subscribe(data => {
  //     if(data && data.email && data.uid){
  //       this.user.email = data.email;
  //       this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(res => {this.adotante = res})
  //       // this.dialogo.abreCarregando();
  //       this.provider.getAll().subscribe(res => { 
  //         const lista : any[] = res
  //         this.listaAnimais = lista;
  //         this.avaliacaoProvider.getAll().subscribe(item =>{
  //           console.log(item)
  //         this.avaliados = item;
  //           if(this.avaliados){
  //             const relacionados = this.relacionarAvaliados(this.listaAnimais, this.avaliados)
  //             console.log(relacionados)
  //           }
  //         })
  //       });
  //       // this.dialogo.fechaCarregando();
  //     }else{
  //       this.dialogo.exibirToast("Não foi possível carregar autenticados");
  //     }
  //   });
  // }

  carregarListaAnimais(){
    this.dialogo.abreCarregando();
    this.provider.getAll().subscribe(res => { 
      const lista : any[] = res
      this.animais = lista;
      this.dialogo.fechaCarregando();
    })
  }

  relacionarAvaliados(animais: any, avaliacoes: any){
    for (let index = 0; index < animais.length; index++) {
      const animal = animais[index];
      if(avaliacoes.length > 0){
        for (let index = 0; index < avaliacoes.length; index++) {
          const avaliacao = avaliacoes[index];
          if(animal.key === avaliacao.key){
            animal.avaliacao = avaliacao.rating           
          }else{
            const indice = animais.indexOf(animal)
            animais.splice(indice,1)
          }
        }
      }
    }
    return animais;
  }
}
