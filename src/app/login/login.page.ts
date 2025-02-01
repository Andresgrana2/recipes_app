import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' }]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
  ) { 

      this.loginForm = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });

  }

  ngOnInit() {
  }


  loginUser(credentials: any) {
    console.log(credentials);
    
    this.authService.loginUser(credentials)
    .then((res: any) => {
      this.errorMessage ='';
      this.storage.set('user', res.user);
      console.log(res);
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu/home');
      this.navCtrl.navigateForward('/menu/home');
      this.loginForm.reset();
    }).catch(err => {
      this.errorMessage = err;
    });
  }

}
