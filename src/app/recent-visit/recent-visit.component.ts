import { Component, OnInit } from '@angular/core';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-recent-visit',
  templateUrl: './recent-visit.component.html',
  styleUrls: ['./recent-visit.component.css']
})
export class RecentVisitComponent implements OnInit {

  public filterVisit:any;
  public visits:any = []
  public isLoading = true
  public userId:any
  public error:any
  constructor(public server: NodeServerService) {
    server.user.subscribe((user:any)=>{
      this.userId = user._id
    })
   }

  ngOnInit(): void {
    let data = {user_id: this.userId}
    this.server.myVisits().subscribe(data=>{
      this.error = ''
      this.visits = data
      console.log(data)
      this.isLoading = false
    }, err=>{
      this.isLoading = false
      this.error = 'Server Error'
    })
  }

}
