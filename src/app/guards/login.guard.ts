import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private storage: Storage, 
    private navCtrl: NavController) {}
  
  async canActivate() {
    return await this.storage.get('isUserLoggedIn') ? true : 
    this.navCtrl.navigateRoot('/login');
  }

};
