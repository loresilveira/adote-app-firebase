import { Injectable } from '@angular/core';
import { AnimaisProvider } from '../animais/animais';
//import cosSimilarity from "cos-similarity";
import { Observable } from 'rxjs';
declare var require:  any;
var jaccard = require("jaccard");
const cosSimilarity = require('calculate-cosine-similarity');

@Injectable()
export class RecomendacaoProvider {

animais:  Observable<any>;
   
  constructor(private animaisProvider : AnimaisProvider) {
    console.log('Hello RecomendacaoProvider Provider');
 }
   
   distancia(a: any, b: any) {
    let measure = jaccard.index(a , b)
    return measure;
  }

  similaridadeCosseno(a:any, b:any){
    let measure = cosSimilarity(a,b)
    return measure;
  }

  cosineSimilaraty (adotante: any, animais: any){
    let vetorAdotante = Object.keys(adotante).map(key => adotante[key])
    vetorAdotante.splice(1,1)
    animais.forEach(item => {
      const objAnimal = this.trataObjeto(item);
      let measure = this.similaridadeCosseno(vetorAdotante, objAnimal)
      item.similaridade = measure;
    })
    
    let listaAnimais = this.ordenar(animais)
    return listaAnimais.slice(0,5)
  
  }

  trataObjeto(item:any) {
    console.log(item)  
    let vetorAnimal = Object.keys(item).map(key => item[key]);
    vetorAnimal.shift(); // retira a propriedade "key" do objeto para calcular
    vetorAnimal.splice(1,1); // retira a propriedade "nome" do objeto para calcular
      // vetorAnimal.splice(8,8); // retira as propriedades "prop_" usadas no card
      return vetorAnimal
  }

   ordenar(lista: any) {
    let ordenados = lista.sort((a,b)=>{
      if(a.similaridade > b.similaridade) {return -1}
      if(a.similaridade < b.similaridade) {return 1}
      return 0;
    })
    return ordenados;
  }

  ordemAlfabetica(lista:any){
    let ordenados = lista.sort((a,b) =>{
      if(a < b) {return -1}
      if(a > b) {return 1}
      return 0;
    })
    return ordenados;
  }

  


}
