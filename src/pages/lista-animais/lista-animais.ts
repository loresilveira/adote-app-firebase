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
    private alert: AlertController,
    private recomendacao : RecomendacaoProvider) {
    this.adotante = navParams.get('adotante');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAnimaisPage');
    this.provider.getAll().subscribe(res => { 
      this.animais = res;
      this.calculaDistancia();
    }
      )
  }

  ngOnInit(){
    
  }

  calculaDistancia (){
    console.log(this.animais);
    console.log(this.adotante)
    if(this.animais && this.adotante){
      let adotante = Object.keys(this.adotante).map(key => this.adotante[key])
      this.animais.forEach(animal =>{
        let objeto = Object.keys(animal).map(key => animal[key])
       objeto.shift();
console.log(objeto)
             let measure = this.recomendacao.distancia(adotante, objeto)
             console.log(measure)


      })
      console.log(this.animalArray)

             // let measureMoradia = this.recomendacao.distancia(this.adotante.moradia, item.moradia)

     // this.resultadoJaccard = this.recomendacao.distancia(this.adotante, this.animais)
     // this.resultadoJaccard = this.recomendacao.distancia(Object.keys(this.adotante), this.animais)
     
    }
  
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
