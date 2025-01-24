import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  posts: any;

  constructor(
    private postService: PostService,
  ) {}



  ngOnInit(): void {
    this.postService.getPosts().then((posts: any) => {
     this.posts = posts;
    });
  }




}
