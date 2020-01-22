import { TestBed, inject } from '@angular/core/testing';

import { CountrystatecityService } from './countrystatecity.service';

describe('CountrystatecityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountrystatecityService]
    });
  });

  it('should be created', inject([CountrystatecityService], (service: CountrystatecityService) => {
    expect(service).toBeTruthy();
  }));
});
