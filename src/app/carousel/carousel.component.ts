import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public imgArr: any = [ ];
  public isLoading = true;
  constructor(public server: NodeServerService, public router: Router) { }

  ngOnInit(): void {
    this.server.getMethod('banner/getBanner').subscribe(banners => {
      this.imgArr = banners;
      this.isLoading = false;
      console.log(banners);
    }, ()=>{
      this.imgArr = []
      this.isLoading = false
    });
  }
  book(): any{
    this.router.navigate(['book-room']);
  }

}
