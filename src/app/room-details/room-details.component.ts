import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  public categories = ['Family Room', 'Single Room', 'Deluxe Room', 'Executive']
  public picture:any;
  public isLoading = true
  public noSpinnerShow = true
  public roomDetails = new FormGroup({
    picture: new FormControl(''),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    available: new FormControl('', Validators.required)
  })
  public details: any = [];
  public error:any = ''
  constructor(
    public server: NodeServerService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.server.getMethod('room/getRoom').subscribe((data)=>{
      this.details = data
      this.isLoading = false
    }, (err)=>{
      console.log(err)
      this.error = 'Internal Server Error'
      this.isLoading = false
    })
  }

  getThePicFile(event:any){
    const reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = ()=>{
      this.picture = reader.result as any
    }
  }
  uploadDetails(){
    this.roomDetails.value.picture = this.picture
    if (this.picture !== undefined && this.roomDetails.valid) {
      this.noSpinnerShow = false
      this.server.uploadRoomDetails(this.roomDetails.value).subscribe(res=>{
          this.snackBar.open('Details uploaded successfully', 'Dismiss', {duration: 3000})
          this.noSpinnerShow = true;
          this.roomDetails.reset()
          this.ngOnInit()
      }, err=>{
        this.snackBar.open('Internal Server Error', 'Dismiss', {duration: 3000})
        this.noSpinnerShow = true;
      });
    } else {
      this.snackBar.open('Please fill out all input fields', 'Undo', {duration: 3000})
    }
  }

  deleteDetails(details:any) {
    details.type = 'deleteRoom';
    const dialogRef = this.dialog.open(DialogComponent, { data: details, disableClose: true, width: '400px' });
    dialogRef.afterClosed().subscribe(message => {
      if(message == 'Success') {
        this.ngOnInit()
      }else{}
    });
  }

  preview(details: any){
    details.type = 'previewRoom';
    this.dialog.open(DialogComponent, { data: details, width: '350px' });
  }

}
