import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDogComponent } from './search-dog.component';

describe('SearchDogComponent', () => {
  let component: SearchDogComponent;
  let fixture: ComponentFixture<SearchDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
