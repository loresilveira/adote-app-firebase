import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimaisProvider } from '../../providers/animais/animais';

@IonicPage()
@Component({
  selector: 'page-animal',
  templateUrl: 'animal.html',
})
export class AnimalPage {
  title: string;
  form: FormGroup;
  animal: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: AnimaisProvider,
    private toast: ToastController) {

    // maneira 1
    this.animal = this.navParams.data.animal || { };
    this.createForm();

    // // maneira 2
    // this.contact = { };
    // this.createForm();

    // if (this.navParams.data.key) {
    //   const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
    //     subscribe.unsubscribe();

    //     this.contact = c;
    //     this.createForm();
    //   })
    // }

    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.animal ? 'Alterando Animal' : 'Novo animal';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.animal.key],
      nome: [this.animal.nome, Validators.required],
      porte:[this.animal.porte, Validators.required],
      pelagem:[this.animal.pelagem , Validators.required],
      sexo:[this.animal.sexo, Validators.required],
      amigavel_crianca: [this.animal.amigavel_crianca, Validators.required],
      apartamento: [this.animal.apartamento, Validators.required],
      guarda: [this.animal.guarda, Validators.required],
      brincadeira: [this.animal.brincadeira, Validators.required],
      exercicio: [this.animal.exercicio, Validators.required],
      queda_pelo: [this.animal.queda_pelo, Validators.required],
      tendencia_latir: [this.animal.tendencia_latir, Validators.required],
  
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Animal salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o animal.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
}