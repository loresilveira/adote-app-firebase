import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';


@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  title: string;
  form: FormGroup;
  usuario: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: UsuariosProvider,
    private toast: ToastController) {

    // // maneira 1
    // this.usuario = this.navParams.data.usuario || { };
    // this.createForm();

    // maneira 2
    this.usuario = { };
    this.createForm();

    if (this.navParams.data.key) {
      const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
        subscribe.unsubscribe();

        this.usuario = c;
        this.createForm();
      })
    }

    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.key ? 'Alterando Usuário' : 'Novo usuário';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.usuario.key],
      nome: [this.usuario.nome, Validators.required],
      pref_porte: [this.usuario.pref_porte, Validators.required],
      pref_pelagem:[this.usuario.pref_pelagem, Validators.required],
      pref_sexo:[this.usuario.pref_sexo , Validators.required],
      pref_amigavel_crianca:[this.usuario.pref_amigavel_crianca, Validators.required],
      pref_apartamento: [this.usuario.pref_apartamento, Validators.required],
      pref_guarda: [this.usuario.pref_guarda, Validators.required],
      pref_brincadeira: [this.usuario.pref_brincadeira, Validators.required],
      pref_exercicio: [this.usuario.pref_exercicio, Validators.required],
      pref_queda_pelo: [this.usuario.pref_queda_pelo, Validators.required],
      pref_tendencia_latir: [this.usuario.pref_tendencia_latir, Validators.required],
    
     
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Usuário salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
}