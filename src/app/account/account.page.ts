import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';

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
    followed_users: [],
    following_users: []
  };


  constructor(
    private userService: UserService,
    private storage: Storage
  ) { }

  takePhoto() {}

  async ngOnInit() {

    let user: any = await localStorage.getItem("user");

    this.userService.getUser(user?.id).then((data: any) => {
      console.log(data);
      this.storage.set('user', data);
      this.user_data = data;
    }).catch((error) => {
      console.log(error);
    });
  }

}
