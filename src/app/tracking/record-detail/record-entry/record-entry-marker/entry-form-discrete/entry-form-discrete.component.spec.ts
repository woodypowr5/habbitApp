import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFormDiscreteComponent } from './entry-form-discrete.component';

describe('EntryFormDiscreteComponent', () => {
  let component: EntryFormDiscreteComponent;
  let fixture: ComponentFixture<EntryFormDiscreteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryFormDiscreteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryFormDiscreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
