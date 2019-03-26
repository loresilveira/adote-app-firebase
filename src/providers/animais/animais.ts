import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs-compat/operators/map';
import 'rxjs/add/operator/map'

/*
  Generated class for the AnimaisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnimaisProvider {

  private PATH = 'animais/';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello AnimaisProvider Provider');
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
 
  save(animal: any) {
    return new Promise((resolve, reject) => {
      if (animal.key) {
        this.db.list(this.PATH)
          .update(animal.key, { 
            nome: animal.nome, 
            porte: animal.porte, 
            pelagem: animal.pelagem, 
            sexo: animal.sexo, 
            amigavel_crianca: animal.amigavel_crianca, 
            apartamento: animal.apartamento, 
            guarda: animal.guarda, brincadeira: animal.brincadeira, 
            exercicio: animal.exercicio,
            queda_pelo: animal.queda_pelo, 
            tendencia_latir: animal.tendencia_latir
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ 
            nome: animal.nome, 
            porte: animal.porte, 
            pelagem: animal.pelagem, 
            sexo: animal.sexo, 
            amigavel_crianca: animal.amigavel_crianca, 
            apartamento: animal.apartamento, 
            guarda: animal.guarda, 
            brincadeira: animal.brincadeira, 
            exercicio: animal.exercicio,
            queda_pelo: animal.queda_pelo, 
            tendencia_latir: animal.tendencia_latir
           })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
