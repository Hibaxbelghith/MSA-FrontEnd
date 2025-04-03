import { TestBed } from '@angular/core/testing';

import { SentimentServiceService } from './sentiment-service.service';

describe('SentimentServiceService', () => {
  let service: SentimentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
