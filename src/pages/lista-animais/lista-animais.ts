import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalPage } from '../animal/animal';
import { Adotante } from '../../models/adotante';
import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { AnimalModel } from '../../models/animal';

@IonicPage()
@Component({
  selector: 'page-lista-animais',
  templateUrl: 'lista-animais.html',
})
export class ListaAnimaisPage {


  resultadoJaccard : any;

   animais: any[];
   animalArray: any[];
  //  adotante : any[];
  
   adotante : Adotante = {
    nome : "",
    moradia: "",
    porte: "",
    pelagem: "",
    sexo: "",
  }


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: AnimaisProvider,
    private toast: ToastController,
    private alert: AlertController,) {
    this.animais = navParams.get('animais');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAnimaisPage');

  }

//  jaccardSimilarity (arr1: any, arr2: any){
//       let vetor1 = Object.keys(arr1).map(key => arr1[key])
//       arr2.forEach(item =>{
//         let vetor2 = Object.keys(item).map(key => item[key]);
//          vetor2.shift();
//         let measure = this.recomendacao.distancia(vetor1, vetor2)
//              console.log(measure)
//       })  
//   }

  ordenar(lista: any) {
    let ordenados = lista.sort((a,b)=>{
      if(a.similaridade < b.similaridade) {return -1}
      if(a.similaridade > b.similaridade) {return 1}
      return 0;
    })
    return ordenados;
  }

  newAnimal() {
    this.navCtrl.push(AnimalPage);
  }

  editAnimal(animal: any) {
    // Maneira 1
    // this.navCtrl.push('AnimalPage', { animal: animal });

    // Maneira 2
    this.navCtrl.push('AnimalPage', { key: animal.key });
  }

  removeAnimal(key: string) {
    let alert = this.alert.create({
      title: 'Excluir animal',
      message: 'Deseja excluir?',
      buttons: [
        {
            text: 'Não',
            handler: () => {
                console.log('Cancelado');
            }
        },
        {
            text: 'Sim',
            handler: () => {
              if (key) {
                this.provider.remove(key)
                  .then(() => {
                    this.toast.create({ message: 'Animal removido com sucesso.', duration: 3000 }).present();
                  })
                  .catch(() => {
                    this.toast.create({ message: 'Erro ao remover animal.', duration: 3000 }).present();
                  });
              }
            }
        }
    ]
    });
    alert.present();

    
  }

}
