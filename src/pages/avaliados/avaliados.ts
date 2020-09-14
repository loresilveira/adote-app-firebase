import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { AnimaisProvider } from '../../providers/animais/animais';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { AnimalModel } from '../../models/animal';
import { AvaliadosProvider } from '../../providers/avaliados/avaliados';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';
import { AvaliadoModel } from '../../models/avaliado';
import { rejects } from 'assert';

@IonicPage()
@Component({
  selector: 'page-avaliados',
  templateUrl: 'avaliados.html',
})
export class AvaliadosPage {

  animais: AnimalModel[];
  user: User = { id: '', email: '', password: '' };
  adotante: Adotante;
  listaAnimais: AnimalModel[];
  avaliados: any[];
  listaAvaliados: Array<AvaliadoModel> = [];

  listaCincoPrimeiros: Array<number> = [];
  listaCincoUltimos: Array<number> = [];
  listaDezUltimos: Array<number> = [];
  listaAdotantes: Array<string> = [];
  adotantes: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private recomendacao: RecomendacaoProvider,
    private provider: AnimaisProvider,
    private avaliacaoProvider: AvaliadosProvider,
    private dialogo: DialogoProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliadosPage');
  }

  ngOnInit() {
    this.getAdotantes();
  }

  organizarPorUsuario(key: string) {
    this.avaliacaoProvider.getOneAdmin(key).subscribe( async res => {
      let ordenados = this.ordenar( await res)
      console.log(ordenados)
      const cincoPrimeiros: any[] = ordenados.slice(0,4);
      const cincoUltimos: any[] = ordenados.slice(5, 9);
      const dezUltimos: any[] = ordenados.slice(10, 20);
      // console.log(dezPrimeiros)
      // console.log(dezUltimos)
      cincoPrimeiros.forEach(element => {
        this.listaCincoPrimeiros.push(element.rating)
      });
      cincoUltimos.forEach(element => {
        this.listaCincoUltimos.push(element.rating)
      });
      dezUltimos.forEach(element => {
        this.listaDezUltimos.push(element.rating)
      })
     
     const quantUm = this.countOccurrences(this.listaDezUltimos, 1)
     const quantDois = this.countOccurrences(this.listaDezUltimos, 2)
     const quantTres =this.countOccurrences(this.listaDezUltimos, 3)
     const quantQuatro = this.countOccurrences(this.listaDezUltimos, 4)
     const quantCinco = this.countOccurrences(this.listaDezUltimos, 5)

     console.log(quantUm)
     console.log(quantDois)
     console.log(quantTres)
     console.log(quantQuatro)
     console.log(quantCinco)

    })

  }

  countOccurrences (arr, val){
    return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  }


  getAvaliacoes(lista: any[]){
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      this.organizarPorUsuario(element)

    }
  }

  ordenar(lista: any) {
    let ordenados = lista.sort((a, b) => {
      if (a.dataHora < b.dataHora) { return -1 }
      if (a.dataHora > b.dataHora) { return 1 }
      return 0;
    })
    return ordenados;
  }

  
   getAdotantes() {
      this.avaliacaoProvider.getAllAdmin()
      .subscribe( async res => {
          await res.forEach(item =>{
            console.log(item.key)
            this.organizarPorUsuario(item.key);
            // console.log(this.listaDezPrimeiros)
            // console.log(this.listaDezUltimos)
          })
          
      })

  }



  carregarListaAnimais() {
    this.dialogo.abreCarregando();
    this.provider.getAll().subscribe(res => {
      const lista: any[] = res
      this.animais = lista;
      this.dialogo.fechaCarregando();
    })
  }

  relacionarAvaliados(animais: any, avaliacoes: any) {
    for (let index = 0; index < animais.length; index++) {
      const animal = animais[index];
      if (avaliacoes.length > 0) {
        for (let index = 0; index < avaliacoes.length; index++) {
          const avaliacao = avaliacoes[index];
          if (animal.key === avaliacao.key) {
            animal.avaliacao = avaliacao.rating
          } else {
            const indice = animais.indexOf(animal)
            animais.splice(indice, 1)
          }
        }
      }
    }
    return animais;
  }
}
