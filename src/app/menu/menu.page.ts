import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';1

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
    private menuController: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {

   let usera = this.storage.get('user').then((usera) => {
    this.user = usera ;
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
