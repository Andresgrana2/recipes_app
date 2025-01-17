import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  
import { register } from 'swiper/element/bundle';
import { Storage} from '@ionic/storage-angular';

register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private storage: Storage
  ) {}


  async ngOnInit() {
    await this.storage.create();
  }
}
