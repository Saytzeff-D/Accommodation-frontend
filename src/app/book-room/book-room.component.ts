import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../register/register.component';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  myControl = new FormControl();
  public today = new Date().toISOString().split('T')[0];
  public roomCategory = '';
  public savedRoomData: any = JSON.parse(sessionStorage.getItem('roomInfo')!);
  public noSpinnerShow = true;
  public dontShowWord = false;
  public dateDiff: any = '';
  public categories = ['Family Room', 'Single Room', 'Deluxe Room', 'Executive'];

  public bookRoom = new FormGroup({
    checkIn: new FormControl('', Validators.required),
    checkOut: new FormControl('', Validators.required),
    rooms: new FormControl('', Validators.required),
    guests: new FormControl('', Validators.required),
    nights: new FormControl(''),
    category: new FormControl(sessionStorage.getItem('roomCategory'))
  });
  matcher = new MyErrorStateMatcher();
  constructor(public server: NodeServerService, public router: Router) {
  }
  public error = '';

  ngOnInit(): void {
    sessionStorage.removeItem('route');
    sessionStorage.removeItem('roomInfo');
  }

  bookNow(): any{
    this.error = '';
    this.bookRoom.value.nights = this.checkDateDiff()
    sessionStorage.removeItem('bookRoomInfo');
    sessionStorage.removeItem('roomCategory');
    if (this.bookRoom.valid && this.bookRoom.value.category !== null) {
      this.noSpinnerShow = false;
      this.dontShowWord = true;
      const roomInfo = {category: this.bookRoom.value.category, rooms: this.bookRoom.value.rooms};
      this.server.checkAvailableRoom(roomInfo).subscribe(res => {
        console.log(res)
        if (res === 'Checked') {
          sessionStorage.setItem('bookRoomInfo', JSON.stringify(this.bookRoom.value));
          this.router.navigate(['payNow']);
        } else {
          this.noSpinnerShow = true;
          this.dontShowWord = false;
          this.error = 'This room is unavailable at the moment';
        }
      }, error => {
        console.log(error.error.message)
          this.noSpinnerShow = true;
          this.dontShowWord = false;
          this.error = 'Unable to Process your request at this time';
        // }
      });
    } else {
      this.error = 'All fields are Required';
    }
  }
  checkDateDiff(): any{
    let checkout:any = this.bookRoom.value.checkOut
    if (this.bookRoom.value.checkIn && this.bookRoom.value.checkOut !== ''){
      const checkIn = new Date(this.bookRoom.value.checkIn);
      const checkOut = new Date(checkout);
      const Time = checkOut.getTime() - checkIn.getTime();
      // this.dateDiff = Time / (1000 * 3600 * 24);
      if (Math.sign(Time / (1000 * 3600 * 24)) === -1 || Math.sign(Time / (1000 * 3600 * 24)) ===  0){
        this.error = 'Check out date invalid';
        return ''
      }else {
        return Time / (1000 * 3600 * 24)
      }
    }
  }

  dismissAlert(){
    this.error = ''
  }

}
