import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimaisProvider } from '../animais/animais';
import { UsuariosProvider } from '../usuarios/usuarios';
import { Observable } from 'rxjs';


@Injectable()
export class RecomendacaoProvider {

  jaccard_distance = require('jaccard');
  cosine_similarity = require('calculate-cosine-similarity');

   animais:  Observable<any>;
   
  constructor(public http: HttpClient,
              private animaisProvider : AnimaisProvider,
              private usuariosProvider: UsuariosProvider) {
    console.log('Hello RecomendacaoProvider Provider');

    this.animais = this.animaisProvider.getAll();
  }

  




  

}
