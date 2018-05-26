import { TestBed, inject } from '@angular/core/testing';

import { AirlineService } from './airline.service';

describe('AirlineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirlineService]
    });
  });

  it('should be created', inject([AirlineService], (service: AirlineService) => {
    expect(service).toBeTruthy();
  }));
});
