import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyWorkersComponent } from './copy-workers.component';

describe('CopyWorkersComponent', () => {
  let component: CopyWorkersComponent;
  let fixture: ComponentFixture<CopyWorkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyWorkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
