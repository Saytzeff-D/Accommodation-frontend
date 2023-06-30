import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public loggingOut = false;
  public isLoading = false;

  constructor(
    @Inject (MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    public server: NodeServerService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // console.log(this.dialogData)
  }
  onNoClick(): any{
    this.dialogRef.close();
  }
  onYesClick(): any{
    localStorage.removeItem('JWT')
    this.dialogRef.close();
    this.router.navigate(['/login'])
  }

  onYesCheckOut(): any {
    this.isLoading = true;
    const obj = { id: this.dialogData.booked_room_id };
    this.server.checkOut(obj).subscribe(res => {
      if (res === 'Success'){
        this.dialogRef.close('Check Out');
      }else {
        this.snackBar.open('An error has occured', 'Dismiss', {duration: 4000});
        this.isLoading = false;
      }
    }, err => {
      this.isLoading = false;
      this.snackBar.open('Internal Server Error', 'Dismiss', {duration: 4000});
    });
  }

  deleteBanner(): any {
    this.isLoading = true;
    const obj = { id: this.dialogData._id };
    this.server.deleteBanner(obj).subscribe((res) => {
      this.dialogRef.close(res);
      this.snackBar.open('Banner deleted successfully', 'Dismiss', {duration: 4000});
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

  deleteRoom(): any {
    this.isLoading = true;
    const obj = { id: this.dialogData._id };
    this.server.deleteRoom(obj).subscribe((res) => {
      this.dialogRef.close(res);
      this.snackBar.open('Details deleted successfully', 'Dismiss', {duration: 4000});
    }, (err) => {
      console.log(err);
      this.isLoading = false;
    });
  }

}
