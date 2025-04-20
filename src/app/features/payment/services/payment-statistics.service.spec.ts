import { TestBed } from '@angular/core/testing';

import { PaymentStatisticsService } from './payment-statistics.service';

describe('PaymentStatisticsService', () => {
  let service: PaymentStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
