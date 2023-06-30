import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodeServerService {

  public baseUrl = environment.baseUrl
  public user = new BehaviorSubject({})
  public auth_token = new BehaviorSubject('')
  constructor(public http: HttpClient) { }

  registerUser(obj: any){
    return this.http.post(`${this.baseUrl}user/register`, obj)
  }
  loginUser(loginForm: any){
    return this.http.post(`${this.baseUrl}user/login`, loginForm)
  }
  setBanner(obj: any){
    return this.http.post(`${this.baseUrl}banner/setBanner`, obj)
  }
  getMethod(route: any){
    return this.http.get(`${this.baseUrl + route}`)
  }
  uploadRoomDetails(details: any){
    return this.http.post(`${this.baseUrl}room/uploadDetails`, details)
  }
  fetchUser(){
    return this.http.get(`${this.baseUrl}user/me`);
  }
  token(){
    return localStorage.getItem('JWT');
  }
  uploadUserPic(file: any){
    return this.http.post(`${this.baseUrl}editProfile`, file);
  }
  updateUserProfile(obj: any){
    return this.http.post(`${this.baseUrl}editProfile`, obj);
  }
  checkAvailableRoom(roomInfo: any){
    return this.http.post(`${this.baseUrl}room/checkRoom`, roomInfo);
  }
  getRoomPrice(category: any){
    return this.http.post(`${this.baseUrl}room/price`, category);
  }
  payNow(payInfo: any){
    return this.http.post(`${this.baseUrl}booked/pay`, payInfo);
  }
  transHistory(){
    return this.http.get(`${this.baseUrl}booked/transHistory`);
  }
  allBookings(){
    return this.http.get(`${this.baseUrl}booked/allBookings`);
  }
  myVisits(){
    return this.http.get(`${this.baseUrl}booked/myVisits`);
  }
  verifyPayment(obj: any){
    return this.http.post(`${this.baseUrl}booked/verifyPay`, obj);
  }
  checkOut(booking: any){
    return this.http.patch(`${this.baseUrl}checkOut`, booking);
  }
  deleteRoom(id: any) {
    return this.http.patch(`${this.baseUrl}room/deleteRoom`, id);
  }
  deleteBanner(id: any) {
    return this.http.patch(`${this.baseUrl}banner/deleteBanner`, id);
  }
}
