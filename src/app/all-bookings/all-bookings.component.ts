import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {

  public filterUser:any;
  public bookingRecords:any = []
  public isLoading = true
  public error = ''
  constructor(public server: NodeServerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.server.allBookings().subscribe(data => {
      this.error = ''
      this.isLoading = false;
      this.configArray(data)
    }, err=>{
      this.error = 'Server Error'
      this.isLoading = false
    });
  }

  configArray(data:any){
    let bookings = data[0]
    let users = data[1]
    bookings.map((each:any, i:any)=>{
      let bookedUser = users.find((item:any, i:any)=>(each.user_id == item._id))
      bookings[i] = {...each, firstName: bookedUser.firstName, lastName: bookedUser.lastName}
      this.bookingRecords = [...this.bookingRecords, bookings[i]]
    })
  }
  checkOut(booking:any){
    booking.type = 'checkOut';
    const dialogRef = this.dialog.open(DialogComponent, { data: booking, width: '350px' });
    dialogRef.afterClosed().subscribe(message => {
      message === 'Check Out' ? this.ngOnInit() : console.log('Nothing');
    });
  }
}
