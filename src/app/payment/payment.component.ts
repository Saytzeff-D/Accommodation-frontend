import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaystackOptions } from 'angular4-paystack';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public bookingInfo:any = {}
  public roomDetails:any = {}
  public dontShowLoading = false
  public dontShowPage = true
  public amountPayable:any = ''
  constructor(public server: NodeServerService, public router: Router) {
    this.bookingInfo = JSON.parse(sessionStorage.getItem('bookRoomInfo')!)
   }
   options: PaystackOptions = {
     amount: this.amountPayable,
     email: '',
     ref: `${Math.ceil(Math.random() * 10e10)}`
   }

  ngOnInit(): void {
    sessionStorage.removeItem('route')
    if (sessionStorage.getItem('bookRoomInfo')) {
      let obj = {category: this.bookingInfo.category}
    console.log(obj)
    this.server.getRoomPrice(obj).subscribe((res:any)=>{
      console.log(res)
      this.roomDetails = res.roomDetails
      this.options.email = res.email
      this.bookingInfo.user_id = res.user_id
      this.amountPayable = parseInt(this.roomDetails.price) * parseInt(this.bookingInfo.nights) *parseInt(this.bookingInfo.rooms)
      this.options.amount = parseInt(JSON.stringify(parseInt(this.roomDetails.price) * parseInt(this.bookingInfo.nights) *parseInt(this.bookingInfo.rooms)) + '0' + '0')
      this.dontShowLoading = true
      this.dontShowPage = false
    }, error=>{
      if (error.error.message == 'Token Expired' || error.error.message == 'Invalid token') {
        sessionStorage.setItem('route', 'Book-Room')
        sessionStorage.setItem('infoMsg', 'Please Login to continue')
        this.router.navigate(['login'])
      }
    })
    } else {
      this.router.navigate(['book-room'])
    }
  }

  paymentInit(){
    console.log('Payment Initialized')
  }
  paymentDone(ref: any){
    this.bookingInfo.amount = this.amountPayable
    this.bookingInfo.payment_ref = ref.trxref
    this.bookingInfo.payment_status = 'Payment Successful'
    console.log(this.bookingInfo)
    this.server.payNow(this.bookingInfo).subscribe(res=>{
      if(res == 'Inserted'){
        this.router.navigate(['user/trans-history'])
        sessionStorage.removeItem('bookRoomInfo')
      }
    })
  }
  paymentCancel(){
    // this.bookingInfo.amount = this.amountPayable
    // this.bookingInfo.payment_ref = this.options.ref
    // console.log(this.bookingInfo)
    // this.server.payNow(this.bookingInfo).subscribe(res=>{
    //   if(res == 'Inserted'){
    //     this.router.navigate(['user/trans-history'])
    //   }
    // })
  }
  cancel(){
    sessionStorage.removeItem('bookRoomInfo')
    this.router.navigate(['user/dashboard'])
  }

}
