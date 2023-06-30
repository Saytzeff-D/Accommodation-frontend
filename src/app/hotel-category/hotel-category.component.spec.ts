import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCategoryComponent } from './hotel-category.component';

describe('HotelCategoryComponent', () => {
  let component: HotelCategoryComponent;
  let fixture: ComponentFixture<HotelCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
