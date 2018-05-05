import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFormRangeComponent } from './entry-form-range.component';

describe('EntryFormRangeComponent', () => {
  let component: EntryFormRangeComponent;
  let fixture: ComponentFixture<EntryFormRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryFormRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryFormRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
