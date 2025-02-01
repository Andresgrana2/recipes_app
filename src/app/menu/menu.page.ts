import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';import { UserService } from '../services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
1

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {

  user: any = {
    name: '',
    last_name: '',
    image: ''
  };

  constructor(
    private router: Router,
    private menuController: MenuController,
    private navCtrl: NavController,
    private storage: Storage,
    private userService: UserService
  ) { }

  ngOnInit() {

  this.storage.get('user').then((usera) => {
    this.user = usera ;
   });
 
   this.userService.userUpdated.subscribe((user: any)=>{

    let userSaved = {...this.user,  name: user.name,  last_name :user.last_name, image: user.image};

    this.user = userSaved;
  });

  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(_ => {
    this.menuController.close();
  });

  }

  closeMenu() {
    this.menuController.close();
  }

  logout() {
    this.storage.remove('isUserLoggedIn');
      this.navCtrl.navigateRoot('/login');
  }

}
