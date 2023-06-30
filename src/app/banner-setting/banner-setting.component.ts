import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NodeServerService } from '../services/node-server.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-banner-setting',
  templateUrl: './banner-setting.component.html',
  styleUrls: ['./banner-setting.component.css']
})
export class BannerSettingComponent implements OnInit {

  public bannerForm = new FormGroup({
    banner: new FormControl(''),
    caption: new FormControl('', Validators.required),
    subCaption: new FormControl('', Validators.required)
  })
  public file:any
  public noSpinnerShow = true;
  public response: any = {};
  public bannerFiles: any = [];
  public isLoading:any = true;
  public isDeleting = { index: '' };
  public error:any = ''
  constructor(
    public server: NodeServerService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.server.getMethod('banner/getBanner').subscribe((banner)=>{
      this.bannerFiles = banner
      this.isLoading = false
    }, (err)=>{
      console.log(err)
      this.error = 'Internal Server Error'
      this.isLoading = false
    })
  }
  getTheBanner(event:any){
    const reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = ()=>{
      this.file = reader.result as any
    }
  }
  setTheBanner(){
    this.bannerForm.value.banner = this.file
    if(this.file !== undefined && this.bannerForm.valid){
      this.noSpinnerShow = false
      this.server.setBanner(this.bannerForm.value).subscribe(res=>{
        this.response = res
          this.snackBar.open('Banner Records Updated', 'Undo', {duration: 3000})
          this.noSpinnerShow = true
          this.bannerForm.reset()
          this.ngOnInit()
      },(err)=>{
        console.log(err)
          this.snackBar.open('Internal Server Error', 'Close', {duration: 3000})
          this.noSpinnerShow = true
      })
    }
    else {
      this.snackBar.open('All fields are required', 'Close', {duration: 3000})
    }
  }
  deleteBanner(banner:any, i:any){
    banner.type = 'deleteBanner';
    const dialogRef = this.dialog.open(DialogComponent, { data: banner, disableClose: true, width: '350px' });
    dialogRef.afterClosed().subscribe(message => {
      message == 'Success' ? this.ngOnInit() : '';
    });
  }

  preview(banner:any) {
    banner.type = 'previewBanner';
    this.dialog.open(DialogComponent, { data: banner, width: '350px' });
  }

}
