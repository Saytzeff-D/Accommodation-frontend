import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPaymentComponent } from './verify-payment.component';

describe('VerifyPaymentComponent', () => {
  let component: VerifyPaymentComponent;
  let fixture: ComponentFixture<VerifyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
