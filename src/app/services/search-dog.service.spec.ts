import { TestBed } from '@angular/core/testing';

import { SearchDogService } from './search-dog.service';

describe('SearchDogService', () => {
  let service: SearchDogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
