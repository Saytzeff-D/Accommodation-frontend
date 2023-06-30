import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-hotel-category',
  templateUrl: './hotel-category.component.html',
  styleUrls: ['./hotel-category.component.css']
})
export class HotelCategoryComponent implements OnInit {

  public rooms:any = []
  public currentIndex = 0
  public roomGroups:any = []
  public isLoading = true
  constructor(public server: NodeServerService, public router: Router) { }

  ngOnInit(): void {
    this.server.getMethod('room/getRoom').subscribe(details=>{
      this.rooms = details
      this.isLoading = false
      this.multipleRoomArray()
    }, err=>{
      this.isLoading = false
      this.rooms = []
    })
  }
  multipleRoomArray(){
    this.rooms.map((each:any, i:any)=>{
      if(this.currentIndex < this.rooms.length){
        let slicedRooms = this.rooms.slice(this.currentIndex, this.currentIndex + 3)
        console.log(slicedRooms)
        this.roomGroups = [...this.roomGroups, slicedRooms]
        this.currentIndex = this.currentIndex + 3
      }
      else{
        console.log('No more array to duplicate')
      }
    })
  }
  clickBook(roomCategory:any){
    sessionStorage.setItem('roomCategory', roomCategory)
    this.router.navigate(['book-room'])
  }

}
