import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordEntryMarkerComponent } from './record-entry-marker.component';

describe('RecordEntryMarkerComponent', () => {
  let component: RecordEntryMarkerComponent;
  let fixture: ComponentFixture<RecordEntryMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordEntryMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordEntryMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
