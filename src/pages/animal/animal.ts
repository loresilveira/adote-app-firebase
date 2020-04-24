import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimaisProvider } from '../../providers/animais/animais';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';


@IonicPage()
@Component({
  selector: 'page-animal',
  templateUrl: 'animal.html',
})
export class AnimalPage {
  title: string;
  form: FormGroup;
  animal: any;
  photo: string = '';
  novaPhoto: string = '';
  flagInserirFoto = false;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: AnimaisProvider,
    private toast: ToastController,
    private camera: Camera) {

    // // maneira 1
    // this.animal = this.navParams.data.animal || { };
    // this.createForm();

    // // maneira 2

    this.animal = {};
    this.createForm();

    if (this.navParams.data.key) {
      const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
        subscribe.unsubscribe();
        console.log(c)
        this.animal = c;
        this.provider.getFotoAnimal(this.animal.key).then(url =>{ console.log(url);this.photo = url})
        this.createForm();
      })
    }

    this.setupPageTitle();
  }

  ionViewDidLoad(){
    this.flagInserirFoto = true;
  }

  private setupPageTitle() {
    this.title = this.navParams.data.key ? 'Alterando Animal' : 'Novo animal';
  }

  converteBas64(img: any){
    return 'data:image/jpeg;base64,' + img;
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.animal.key],
      nome: [this.animal.nome, ],
      moradia: [this.animal.moradia, ],
      porte:[this.animal.porte, ],
      pelagem:[this.animal.pelagem, ],
      sexo:[this.animal.sexo, ],
      amigavel_crianca: [this.animal.amigavel_crianca, ],
      guarda: [this.animal.guarda,],
      brincadeira: [this.animal.brincadeira,],
      exercicio: [this.animal.exercicio,],
      queda_pelo: [this.animal.queda_pelo,],
      tendencia_latir: [this.animal.tendencia_latir],
      prop_porte : [this.animal.porte === "medio" ? "médio" : this.animal.porte],
      prop_sexo : [this.animal.sexo === "femea" ? "fêmea" : "macho"],
      prop_guarda: [this.animal.guarda === "guarda" ? "sim" : "não"],
      prop_amigavel_crianca: [this.animal.amigavel_crianca === "amigavel" ? "sim" : "não"],
      prop_brincadeira: [this.animal.brincadeira === "brincalhao" ? "sim" : "não"],
      prop_exercicio: [this.animal.exercicio === "ativo" ? "sim" : "não"],
      prop_queda_pelo: [this.animal.queda_pelo === "queda_pelo" ? "sim" : "não"],
      prop_tendencia_latir: [this.animal.tendencia_latir === "tende_latir" ? "sim" : "não"],
      foto: [this.animal.foto],
     
    });
  }
 
  getImage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: true,
      allowEdit: false
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        const base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;
        this.novaPhoto = base64image;
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  onSubmit() {
    if (this.form.valid) {
      if(this.novaPhoto !== '') {
        this.animal.foto = this.provider.setFotoAnimal(this.animal.key, this.photo);
        console.log('entrou')
      }
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Animal salvo com sucesso.', duration: 3000 }).present();
          
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o animal.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
}