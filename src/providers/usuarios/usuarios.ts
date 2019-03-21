import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map'

@Injectable()
export class UsuariosProvider {

  private PATH = 'usuarios/';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello UsuariosProvider Provider');
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
 
  save(usuario: any) {
    return new Promise((resolve, reject) => {
      if (usuario.key) {
        this.db.list(this.PATH)
          .update(usuario.key, { 
            nome: usuario.nome, pref_porte: usuario.pref_porte, 
            pref_pelagem: usuario.pref_pelagem, pref_sexo: usuario.pref_sexo, 
            pref_amigavel_crianca: usuario.pref_amigavel_crianca, pref_apartamento: usuario.pref_apartamento,
            pref_guarda: usuario.pref_guarda, pref_brincadeira: usuario.pref_brincadeira, 
            pref_exercicio: usuario.pref_exercicio, pref_queda_pelo: usuario.pref_queda_pelo,
            pref_tendencia_latir: usuario.pref_tendencia_latir
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ 
            nome: usuario.nome, 
            pref_porte: usuario.pref_porte, 
            pref_pelagem: usuario.pref_pelagem, 
            pref_sexo: usuario.pref_sexo, 
            pref_amigavel_crianca: usuario.pref_amigavel_crianca,
            pref_apartamento: usuario.pref_apartamento,
            pref_guarda: usuario.pref_guarda,
            pref_brincadeira: usuario.pref_brincadeira, 
            pref_exercicio: usuario.pref_exercicio, 
            pref_queda_pelo: usuario.pref_queda_pelo,
            pref_tendencia_latir: usuario.pref_tendencia_latir
           })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
