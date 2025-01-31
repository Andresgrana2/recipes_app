import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController, ModalController } from '@ionic/angular';
import { EditAccountModalPage } from '../edit-account-modal/edit-account-modal.page';
defineCustomElements(window);
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    email: '',
    image: '',
    followees: [],
    followers: []
  };
  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController,
   private modalController: ModalController
  ) { }


  async ngOnInit() {

    let user: any = await this.storage.get("user");

    this.userService.getUser(user?.id).then((data: any) => {
      console.log(data);
      this.storage.set('user', data);
      this.user_data = data;
    }).catch((error) => {
      console.log(error);
    });

    this.userService.userUpdated.subscribe((user: any)=>{
      this.user_data = {...this.user_data,  name: user.name,  last_name :user.last_name, image: user.image};

      this.modalController.dismiss();
    });
  }




  async updateAccount(){
        const modal = await this.modalController.create({
          component: EditAccountModalPage,
          componentProps:{}
        });
     return await modal.present();
  }


}
