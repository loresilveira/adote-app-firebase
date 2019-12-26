import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs-compat/operators/map';
import 'rxjs/add/operator/map'
import { LoadingController } from 'ionic-angular';

@Injectable()
export class AnimaisProvider {

  private PATH = 'animais/';
  public loading;
  constructor(private db: AngularFireDatabase,
    public loadingCtrl:LoadingController,) {
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
            moradia: animal.moradia,
            porte: animal.porte,
            pelagem: animal.pelagem, 
            sexo: animal.sexo, 
            amigavel_crianca: animal.amigavel_crianca, 
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
            moradia: animal.moradia,
            porte: animal.porte,
            pelagem: animal.pelagem, 
            sexo: animal.sexo,
            amigavel_crianca: animal.amigavel_crianca, 
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
