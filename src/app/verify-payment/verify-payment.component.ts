import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NodeServerService } from '../services/node-server.service';

@Component({
  selector: 'app-verify-payment',
  templateUrl: './verify-payment.component.html',
  styleUrls: ['./verify-payment.component.css']
})
export class VerifyPaymentComponent implements OnInit {

  public noSpinnerShow = true;
  public dontShowWord = false;
  public payment_ref = '';
  public paymentDetails: any = [];
  public error = '';
  public expiredDate = '';
  constructor(public server: NodeServerService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  verify(){
    this.error = ''
    this.expiredDate = ''
    this.paymentDetails = []
    this.noSpinnerShow = false
    this.dontShowWord = true
    if(this.payment_ref !== ''){
      let payObj = {paymentRef: this.payment_ref}
      this.server.verifyPayment(payObj).subscribe((data: any) => {
        if (data.length !== 0){
          if (data[0].status === 'Active'){
            this.noSpinnerShow = true;
            this.dontShowWord = false;
            data[0].firstName = data[1].firstName
            data[0].lastName = data[1].lastName
            data[0].email = data[1].email
            this.paymentDetails = data[0];
          }else {
            this.noSpinnerShow = true;
            this.dontShowWord = false;
            this.expiredDate = data[0].checkOut;
          }
        }
        else{
          console.log(data)
          this.noSpinnerShow = true;
          this.dontShowWord = false;
          this.snackBar.open('Payment not found', 'Back', {duration: 5000});
        }
      }, (err) => {
        this.noSpinnerShow = true;
        this.dontShowWord = false;
        this.error = 'Internal Server Error';
      });
    }
    else{
      this.noSpinnerShow = true
      this.dontShowWord = false
      this.snackBar.open('Please, Enter the Payment Reference', 'Back', {duration: 3000})
    }
  }
}
