import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { BannerSettingComponent } from './banner-setting/banner-setting.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotelCategoryComponent } from './hotel-category/hotel-category.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { RecentVisitComponent } from './recent-visit/recent-visit.component';
import { RegisterComponent } from './register/register.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { UserComponent } from './user/user.component';
import { VerifyPaymentComponent } from './verify-payment/verify-payment.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: LandingPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'hotel-category', component: HotelCategoryComponent},
  {path: 'book-room', component: BookRoomComponent},
  {path: 'payNow', component: PaymentComponent},
  { path: 'admin', pathMatch: 'full', redirectTo: '/admin/banner-setting' },
  {path: 'admin', component: AdminComponent, children: [
    {path: 'banner-setting', component: BannerSettingComponent},
    {path: 'roomDetails', component: RoomDetailsComponent},
    {path: 'bookingsRecords', component: AllBookingsComponent},
    {path: 'verifyPayment', component: VerifyPaymentComponent}
  ]},
  { path: 'user', pathMatch: 'full', redirectTo: '/user/dashboard' },
  {path: 'user', component: UserComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'recent-visit', component: RecentVisitComponent},
    {path: 'trans-history', component: TransactionHistoryComponent}
  ]},
  {path: 'admin-login', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
