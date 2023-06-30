import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public loggedUser:any = {}
  public rooms:any = []
  public currentIndex = 0
  public roomGroups:any = []
  public isLoading = true
  constructor(public server: NodeServerService, public router: Router) {
    server.user.subscribe(obj=>{
      this.loggedUser = obj
    })
  }

  ngOnInit(): void {
    this.server.getMethod('room/getRoom').subscribe(data=>{
      console.log(data)
      this.rooms = data
      this.isLoading = false
      this.multipleRoomArray()
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
