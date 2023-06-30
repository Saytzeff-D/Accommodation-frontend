import { Component, OnInit } from '@angular/core';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  public history:any = []
  public isLoading = true
  public error = ''
  public userId:any
  public today = new Date().toLocaleDateString()
  constructor(public server: NodeServerService) {
    server.user.subscribe((user:any)=>{
      this.userId = user._id
    })
   }

  ngOnInit(): void {
    let data = {user_id: this.userId}
    this.server.transHistory().subscribe(data => {
      this.history = data;
      this.error = ''
      this.isLoading = false;
    }, err=>{
      this.error = 'Server Error'
      this.isLoading = false
    });
  }

}
