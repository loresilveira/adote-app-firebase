import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimaisProvider } from '../animais/animais';
import { UsuariosProvider } from '../usuarios/usuarios';
import { Observable } from 'rxjs';
declare var require:  any;
var jaccard = require("jaccard");

@Injectable()
export class RecomendacaoProvider {

   //animais:  Observable<any>;
   
  constructor(public http: HttpClient,
              private animaisProvider : AnimaisProvider,
              private usuariosProvider: UsuariosProvider) {
    console.log('Hello RecomendacaoProvider Provider');

   // this.animais = this.animaisProvider.getAll();

   var a = [
    '1',
    '2',
    '3'
   ];
   
   var b = [
     '3',
     '4',
     '5'
   ];

   console.log(
    jaccard.distance(a, b)
  );


  }

  




  

}
