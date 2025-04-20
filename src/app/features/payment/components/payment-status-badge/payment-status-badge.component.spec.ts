import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusBadgeComponent } from './payment-status-badge.component';

describe('PaymentStatusBadgeComponent', () => {
  let component: PaymentStatusBadgeComponent;
  let fixture: ComponentFixture<PaymentStatusBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentStatusBadgeComponent]
    });
    fixture = TestBed.createComponent(PaymentStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
