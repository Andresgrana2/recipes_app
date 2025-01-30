import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AddPostModalPage } from '../add-post-modal/add-post-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  posts: any[] = [];
  page: number = 1;
  limit: number = 10;
  hasMore: boolean = true;
  isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) {}



  ngOnInit(){
    console.log('Init Home');
    this.loadPosts();
    this.postService.postCreated.subscribe((newPost: any)=>{
      this.posts.unshift(newPost);
    })
  }

  loadPosts(event?: any){
    console.log('Load Posts');
    this.postService.getPosts(this.page, this.limit).then(
      (data: any)=>{
        if (data.length > 0){
          this.posts = [...this.posts, ...data];
          this.page++;
        }else{
          this.hasMore = false;
        }

        if (event){
          event.target.complete();
        }
      },
      (error)=>{
        console.log(error);
        if (event){
          event.target.complete();
        }
      }
    )
  }


  async addPost(){
    console.log('Add Post');
    const modal = await this.modalController.create({
      component: AddPostModalPage,
      componentProps:{}
    });
    return await modal.present();
  }

}
