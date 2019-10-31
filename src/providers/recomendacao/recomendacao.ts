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
   
  constructor(
              private animaisProvider : AnimaisProvider,
              ) {
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

}
