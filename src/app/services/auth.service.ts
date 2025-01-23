import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  urlServer = 'http://51.79.26.171';
  httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(
    private http: HttpClient
  ) { }


  loginUser(credentials: any) {
    
    return new Promise((accept, reject) => {
     
      let params = {
        "user": {
          "email": credentials.email,
          "password": credentials.password
        }
      }

      this.http.post(this.urlServer + '/login', params,  this.httpHeaders)
      .subscribe((data: any) => {
        if(data.status == 'OK') {
          accept(data);
        }else {
          reject(data.errors);
        }

      }, (error) => {
        if(error.status == 422) {
          reject('Usuario o contraseña incorrectos');
      }});

    });

  }

  register(data:any){


    return new Promise((accept, reject) => {
      let params = {
        "user": {
          "email": data.email,
          "password": data.password,
          "password_confirmation": data.passwordConfirmation,
          "name": data.name,
          "last_name": data.lastname,
          "username": data.username
        }
      };

      this.http.post(this.urlServer + '/signup', params,  this.httpHeaders)
      .subscribe((data: any) => {
        if(data.status == 'OK') {
          accept(data);
        }else {
          reject(data.errors);
        }

      }, (error) => {
        if(error.status == 422) {
          reject('Usuario o contraseña incorrectos');
      }});


    });
  }
}
