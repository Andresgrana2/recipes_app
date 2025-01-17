import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Injectable({providedIn: 'root'})
export class IntroGuard implements CanActivate {

constructor(private storage: Storage, private router: Router) {}

  async canActivate() {

    return await this.storage.get('viLaIntro') ?? 
    this.router.navigateByUrl('/intro');
  }
}
