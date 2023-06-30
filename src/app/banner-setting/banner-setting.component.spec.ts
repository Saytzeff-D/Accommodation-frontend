import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSettingComponent } from './banner-setting.component';

describe('BannerSettingComponent', () => {
  let component: BannerSettingComponent;
  let fixture: ComponentFixture<BannerSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
