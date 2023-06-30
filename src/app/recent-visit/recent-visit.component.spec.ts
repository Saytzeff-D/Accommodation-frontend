import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVisitComponent } from './recent-visit.component';

describe('RecentVisitComponent', () => {
  let component: RecentVisitComponent;
  let fixture: ComponentFixture<RecentVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
