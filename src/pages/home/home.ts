import { Component } from '@angular/core';
import { NavController, MenuController, Icon, DateTime } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';
import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalModel } from '../../models/animal';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { AvaliadosProvider } from '../../providers/avaliados/avaliados';
import { AvaliadoModel } from '../../models/avaliado';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage {

  adotante : Adotante;
  recomendados :  AnimalModel[];
  user: User = {id: '', email: '', password:''};
  form: FormGroup;
  public avaliacao : AvaliadoModel = {
    key: '',
    rating: 0,
    dataHora: new Date,
  }
  avaliados : any[];
  listaAnimais : AnimalModel[];
  animal : AnimalModel;
  ratingValue : number = 0;
  countRecomendados : number = 0; 

  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private afDatabase : AngularFireDatabase,
    private recomendacao : RecomendacaoProvider,
    private provider: AnimaisProvider,
    private avaliacaoProvider: AvaliadosProvider,
    private dialogo: DialogoProvider,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,) {
    console.log('Hello Home Page')
  }

  ngOnInit(){
    this.dialogo.abreCarregando();
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
        this.user.id = data.uid;
        this.user.email = data.email;
        this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(res => {
          if(res){
            this.adotante = res;
          } else{
            this.dialogo.fechaCarregando();
            this.navCtrl.push('ApresentacaoPage')
          }
        })
        this.provider.getAll().subscribe(res => { 
          console.log(res)
          const lista : any[] = res
          this.listaAnimais = lista;
          if(this.adotante && this.listaAnimais){
          this.getAvaliados();  
          this.dialogo.fechaCarregando();
          }
        })
        
      }else{
        this.dialogo.exibirToast("Não foi possível se autenticar");
      }
    })

  }

  filtrar(lista: any, item: any){
    const filtrados = lista.filter(animal => animal.porte === item.porte || animal.porte === "medio");
    return filtrados;
  }
   

 removerAvaliados(animais: any[], avaliacoes: any[]){
   animais.map(animal =>{ animal.avaliacao = 0})
   for (let index = 0; index < avaliacoes.length; index++) {
     const avaliacao = avaliacoes[index];
     const animal = animais.find(item => item.key === avaliacao.key)
     if(animal){
       const indice = animais.indexOf(animal)
       animais.splice(indice,1)
     }
   }
    return animais
  }



  getAvaliados(){
    // this.listaAnimais = this.filtrar(this.listaAnimais, this.adotante);
    this.avaliacaoProvider.getAll().take(1).subscribe(item =>{
      this.avaliados = item;
      
      const novaLista = this.removerAvaliados(this.listaAnimais, this.avaliados);

      /** Recomendação */
      const listaRecomendados = this.recomendacao.cosineSimilaraty(this.adotante, novaLista).slice(0,5); 

      /** Sem recomendação */
      //  const listaRecomendados = this.recomendacao.recomendacaoRandom(novaLista).slice(0,5);
      /** */

      this.recomendados = this.getFoto(listaRecomendados)
      this.atualizaPerfil();
      console.log('atualizando perfil')
      this.countRecomendados += 5;
      console.log(this.countRecomendados)
    })
  }

  getFoto(lista: any){
    lista.forEach(item =>{
      this.provider.getFotoAnimal(item.key).then(foto => { item.foto = foto})
    })
    return lista;
  }
  createForm() {
    this.form = this.formBuilder.group({
      key: [this.avaliacao.key],
      rating: [this.avaliacao.rating,],
      dataHora: [this.avaliacao.dataHora,],  
    });
  }

  salvaAvaliacao(){
    this.createForm();
     this.avaliacaoProvider.save(this.form.value)
      .catch((e) => {
        console.error(e);
      })
  }

  logRatingChange(rating, animal){
    this.avaliacao.key = animal.key;
    this.avaliacao.rating = rating;
    this.avaliacao.dataHora = new Date;
    this.salvaAvaliacao(); 
    if(rating > this.ratingValue){
      this.animal = animal;
      this.ratingValue = rating;
      this.recomendarComNovoPerfil(this.animal)
    }
  }

  recomendarComNovoPerfil(animal : AnimalModel){
    if(animal.similaridade >= this.animal.similaridade){
      this.adotante.amigavel_crianca = animal.amigavel_crianca;
      this.adotante.brincadeira = animal.brincadeira;
      this.adotante.exercicio = animal.exercicio;
      this.adotante.guarda = animal.guarda;
      this.adotante.moradia = animal.moradia;
      this.adotante.pelagem = animal.pelagem;
      this.adotante.porte = animal.porte;
      this.adotante.queda_pelo = animal.queda_pelo;
      this.adotante.sexo = animal.sexo;
      this.adotante.tendencia_latir = animal.tendencia_latir;
      console.log(this.adotante)
    }
  }

  atualizaPerfil(){
    this.afDatabase.object(`adotante/${this.user.id}`).set(this.adotante).then((result) => console.log(result))
  }

  goToConclusaoPage(){
    this.navCtrl.push('ConclusaoPage')
  }
  openMenu() {
    this.menuCtrl.open();
  }

  sair(){
    this.afAuth.auth.signOut().then(()=>{ this.navCtrl.setRoot(LoginPage)})
  }

}