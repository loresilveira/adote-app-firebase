import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ListaAnimaisPage } from '../lista-animais/lista-animais';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController,public firebaseauth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User){

    try{
      const result = await this.firebaseauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if(result){
        this.exibirToast('Login efetuado com sucesso');
        this.navCtrl.push(ListaAnimaisPage);
      }
    }
    catch(e) {
      console.error(e);
    }
      
  }

  async cadastrar(user: User) {
    try{
      const result = this.firebaseauth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      if  (result){
        this.exibirToast('Cadastro efetuado com sucesso');
        this.navCtrl.push(RegisterPage); 
      }
    }catch(e){
      console.error(e);    
    }
  }

  exibirToast(mensagem: string){
    let toast = this.toast.create({
      duration: 3000,
      position: 'botton'
    });
    toast.setMessage(mensagem);
    toast.present();
  }


}
