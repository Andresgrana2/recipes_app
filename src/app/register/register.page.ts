import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validPasswordConfirmation } from './util/passwordValid';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' }
    ],
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Name must be at least 6 characters long.' }
    ],
    lastname: [
      { type: 'required', message: 'Lastname is required' },
      { type: 'minlength', message: 'Lastname must be at least 6 characters long.' }
    ],
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 6 characters long.' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
    passwordConfirmation: [
      { type: 'required', message: 'Lastname is required' },
      { type: 'validPasswordConfirmation', message: 'Password does not match' }
    ],

  };

  constructor(
    private formBuilder: FormBuilder,
  ) { 
   
      this.registerForm = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        lastname: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        username: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        passwordConfirmation: new FormControl('', Validators.compose([
          Validators.required,
          validPasswordConfirmation('')
        ]), )
      });

      this.registerForm.get('password')?.valueChanges.subscribe(password => {
        const passwordConfirmationControl = this.registerForm.get('passwordConfirmation');
        passwordConfirmationControl?.setValidators([Validators.required, validPasswordConfirmation(password)]);
        passwordConfirmationControl?.updateValueAndValidity();
      });
  }

  ngOnInit() {
  }


  registerUser(credentials: any) {
    console.log('Registering user');
  
  }

}
