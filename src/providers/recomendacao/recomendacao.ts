import { Injectable } from '@angular/core';
import { AnimaisProvider } from '../animais/animais';
import { UsuariosProvider } from '../usuarios/usuarios';
import { Observable } from 'rxjs';
declare var require:  any;
var jaccard = require("jaccard");

@Injectable()
export class RecomendacaoProvider {

animais:  Observable<any>;
   
  constructor(
              private animaisProvider : AnimaisProvider,
              private usuariosProvider: UsuariosProvider) {
    console.log('Hello RecomendacaoProvider Provider');

 }
   
   distancia(a: any, b: any) {
    jaccard.distance(a , b)
  }

}
