import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-record-entry',
  templateUrl: './record-entry.component.html',
  styleUrls: ['./record-entry.component.css']
})
export class RecordEntryComponent implements OnInit {
  @Input() record;
  @Input() myPlan;
  @Input() activeDate;

  constructor() { }

  ngOnInit() {
  }

  getMeasurementForMarker(marker) {
    
  }

}
