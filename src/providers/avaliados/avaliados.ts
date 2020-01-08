import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map'
import { LoadingController } from 'ionic-angular';
import { AvaliadoModel } from '../../models/avaliado';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable()
export class AvaliadosProvider {

  private PATH = 'avaliados/';
  public loading;
 
  avaliacao : AvaliadoModel;
  
  constructor(private db: AngularFireDatabase,
    public loadingCtrl:LoadingController,
    ) {
    console.log('Hello AvaliadosProvider Provider');
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('key'))
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
 
  save(avaliado: AvaliadoModel) {
    return new Promise((resolve, reject) => {
      if (avaliado.key) {
        this.db.list(this.PATH)
          .update(avaliado.key, { 
            rating: avaliado.rating, 
            animal_key: avaliado.animal_key,            
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ 
            rating: avaliado.rating, 
            animal_key: avaliado.animal_key,
           })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

  
}
