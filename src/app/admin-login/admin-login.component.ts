import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public username = ''
  public pword = ''
  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  login(){
    if(this.username.toLowerCase() == 'admin' && this.pword.toLowerCase() == 'linc'){
      this.router.navigate(['admin'])
    }
    else{
      alert('Login Fail')
    }
  }

}
