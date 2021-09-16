import { TestBed } from '@angular/core/testing';

import { DogDetailsService } from './dog-details.service';

describe('DogDetailsService', () => {
  let service: DogDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
