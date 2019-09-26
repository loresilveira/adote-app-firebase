import { Injectable } from '@angular/core';
import { AnimaisProvider } from '../animais/animais';
import { Observable } from 'rxjs';
declare var require:  any;
var jaccard = require("jaccard");

@Injectable()
export class RecomendacaoProvider {

animais:  Observable<any>;
   
  constructor(
              private animaisProvider : AnimaisProvider,
              ) {
    console.log('Hello RecomendacaoProvider Provider');

 }
   
   distancia(a: any, b: any) {
    jaccard.distance(a , b)
  }

}
