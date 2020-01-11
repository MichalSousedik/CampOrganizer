import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCampComponent } from './search-camp.component';

describe('SearchCampComponent', () => {
  let component: SearchCampComponent;
  let fixture: ComponentFixture<SearchCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
